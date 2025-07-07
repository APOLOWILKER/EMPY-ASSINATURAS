import { Decimal } from '@prisma/client/runtime/library';
import { OperationType, PaymentStatus, PrismaClient } from '../generated/prisma';
import { CreatePurchaseDTO, CreditCardDetails } from '../schemas/purchaseSchemas';

const prisma = new PrismaClient();

export const getUserCurrentPlan = async (userId: string) => {
  try {
    const currentSubscription = await prisma.subscription.findFirst({
      where: { userId: userId, status: 'ACTIVE' },
      orderBy: { startDate: 'desc' },
      select: {
        id: true, isMonthly: true, status: true, endDate: true, lastChargeDate: true, paymentMethod: true,
        plan: { select: { id: true, name: true, description: true, monthlyValue: true, annualValue: true, onlineCredits: true, offlineCredits: true } },
        user: { select: { id: true, name: true, email: true } },
      },
    });
    if (currentSubscription) { return currentSubscription; } else { return null; }
  } catch (error) {
    console.error(`Erro no serviço 'getUserCurrentPlan' para o usuário ${userId}:`, error);
    throw new Error('Falha ao buscar o plano atual do usuário.');
  }
};

export const createPurchase = async (userId: string, purchaseData: CreatePurchaseDTO) => {
  const { planId, isMonthly, cardDetails, userEmail } = purchaseData;

  try {
    const plan = await prisma.plan.findUnique({
      where: { id: planId },
      select: { id: true, name: true, monthlyValue: true, annualValue: true },
    });

    if (!plan || !plan.name) {
      throw new Error('Plano não encontrado.');
    }

    let valueToPay: Decimal;
    if (isMonthly) {
        if (plan.monthlyValue === null) {
            throw new Error('Valor mensal não definido para o plano selecionado.');
        }
        valueToPay = plan.monthlyValue;
    } else {
        if (plan.annualValue !== null) {
            valueToPay = plan.annualValue;
        } else if (plan.monthlyValue !== null) {
            valueToPay = plan.monthlyValue.mul(new Decimal(12));
        } else {
            throw new Error('Valores de plano anual e mensal não definidos para o plano selecionado.');
        }
    }

    const userPurchaseHistoryCount = await prisma.purchaseHistory.count({
        where: { userId: userId },
    });

    const isFirstPurchaseForUser = userPurchaseHistoryCount === 0;

    const paymentResult = simulatePayment(cardDetails, valueToPay, isFirstPurchaseForUser);
    const paymentStatus = paymentResult.status;
    const paymentNotes = paymentResult.notes;

    const purchaseHistoryEntry = await prisma.purchaseHistory.create({
      data: {
        userId: userId,
        planId: plan.id,
        operationType: OperationType.PURCHASE,
        paidValue: valueToPay,
        paymentStatus: paymentStatus,
        notes: paymentNotes,
      },
    });

    if (paymentStatus === PaymentStatus.PAID) {
      await prisma.subscription.updateMany({
        where: { userId: userId, status: 'ACTIVE' },
        data: { status: 'INACTIVE', endDate: new Date() },
      });
      const newSubscription = await prisma.subscription.create({
        data: {
          userId: userId,
          planId: plan.id,
          isMonthly: isMonthly,
          status: 'ACTIVE',
          startDate: new Date(),
          lastChargeDate: new Date(),
          paymentMethod: `${getCardBrand(cardDetails.cardNumber)} - final ${cardDetails.cardNumber.slice(-4)}`,
        },
      });

      return {
        status: 'success',
        message: 'Plano contratado com sucesso!',
        subscription: newSubscription,
        purchaseHistory: purchaseHistoryEntry,
      };
    } else {
      return {
        status: 'failed',
        message: paymentNotes,
        purchaseHistory: purchaseHistoryEntry,
      };
    }
  } catch (error: any) {
    console.error(`Erro no serviço 'createPurchase' para o usuário ${userId}:`, error);
    throw new Error(`Falha ao processar a compra: ${error.message || 'Erro desconhecido'}`);
  }
};

const simulatePayment = (cardDetails: CreditCardDetails, amount: Decimal, isFirstPurchaseForUser: boolean) => { 
  if(isFirstPurchaseForUser) {
    return { status: PaymentStatus.PAID, notes: 'Pagamento autorizado para a primeira compra.' };
  }
  
  const random = Math.random();

  if (random < 0.80) { // 80% de chance de sucesso
    return { status: PaymentStatus.PAID, notes: 'Pagamento autorizado.' };
  } else { // 20% de chance de falha
    const failureType = Math.random();
    if (failureType < 0.5) { // 10% para RECUSADO_SEM_LIMITE
      return { status: PaymentStatus.REJECTED_INSUFFICIENT_FUNDS, notes: 'Pagamento recusado: Sem limite no cartão.' };
    } else { // 10% para NAO_AUTORIZADO
      return { status: PaymentStatus.UNAUTHORIZED, notes: 'Pagamento não autorizado pela operadora.' };
    }
  }
};

const getCardBrand = (cardNumber: string): string => {
  if (cardNumber.startsWith('4')) return 'Visa';
  if (cardNumber.startsWith('5')) return 'Mastercard';
  if (cardNumber.startsWith('34') || cardNumber.startsWith('37')) return 'American Express';
  return 'Outros';
};