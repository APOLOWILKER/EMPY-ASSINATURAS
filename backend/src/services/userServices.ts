import { Decimal } from '@prisma/client/runtime/library';
import { OperationType, PaymentStatus, PrismaClient, SubscriptionStatus } from '../generated/prisma';
import { ChangePlanDTO, CreatePurchaseDTO, CreditCardDetails } from '../schemas/purchaseSchema';

const prisma = new PrismaClient();

export const getUserCurrentPlan = async (userId: string) => {
  try {
    const currentSubscription = await prisma.subscription.findFirst({
      where: { userId: userId, status: SubscriptionStatus.ACTIVE }, // <--- USANDO ENUM
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

    if (!plan || !plan.name) { throw new Error('Plano não encontrado.'); }

    let valueToPay: Decimal;
    if (isMonthly) {
        if (plan.monthlyValue === null) { throw new Error('Valor mensal não definido para o plano selecionado.'); }
        valueToPay = plan.monthlyValue;
    } else {
        if (plan.annualValue !== null) { valueToPay = plan.annualValue; }
        else if (plan.monthlyValue !== null) { valueToPay = plan.monthlyValue.mul(new Decimal(12)); }
        else { throw new Error('Valores de plano anual e mensal não definidos para o plano selecionado.'); }
    }

    const userPurchaseHistoryCount = await prisma.purchaseHistory.count({ where: { userId: userId } });
    const isFirstPurchaseForUser = userPurchaseHistoryCount === 0;

    const paymentResult = simulatePayment(cardDetails, valueToPay, isFirstPurchaseForUser);
    const paymentStatus = paymentResult.status;
    const paymentNotes = paymentResult.notes;

    const purchaseHistoryEntry = await prisma.purchaseHistory.create({
      data: {
        userId: userId, planId: plan.id, operationType: OperationType.PURCHASE,
        paidValue: valueToPay, paymentStatus: paymentStatus, notes: paymentNotes,
      },
    });

    if (paymentStatus === PaymentStatus.PAID) {
      await prisma.subscription.updateMany({
        where: { userId: userId, status: SubscriptionStatus.ACTIVE }, // <--- USANDO ENUM
        data: { status: SubscriptionStatus.INACTIVE, endDate: new Date() }, // <--- USANDO ENUM
      });
      const newSubscription = await prisma.subscription.create({
        data: {
          userId: userId, planId: plan.id, isMonthly: isMonthly, status: SubscriptionStatus.ACTIVE, // <--- USANDO ENUM
          startDate: new Date(), lastChargeDate: new Date(),
          paymentMethod: `${getCardBrand(cardDetails.cardNumber)} - final ${cardDetails.cardNumber.slice(-4)}`,
        },
      });
      return { status: 'success', message: 'Plano contratado com sucesso!', subscription: newSubscription, purchaseHistory: purchaseHistoryEntry };
    } else {
      return { status: 'failed', message: paymentNotes, purchaseHistory: purchaseHistoryEntry };
    }
  } catch (error: any) {
    console.error(`Erro no serviço 'createPurchase' para o usuário ${userId}:`, error);
    throw new Error(`Falha ao processar a compra: ${error.message || 'Erro desconhecido'}`);
  }
};

const simulatePayment = (cardDetails: CreditCardDetails, amount: Decimal, isFirstPurchase: boolean) => {
    if (isFirstPurchase) {
        return { status: PaymentStatus.PAID, notes: 'Pagamento autorizado para a primeira compra.' };
    }
    const random = Math.random();
    if (random < 0.80) { return { status: PaymentStatus.PAID, notes: 'Pagamento autorizado.' }; }
    else {
        const failureType = Math.random();
        if (failureType < 0.5) { return { status: PaymentStatus.REJECTED_INSUFFICIENT_FUNDS, notes: 'Pagamento recusado: Sem limite no cartão.' }; }
        else { return { status: PaymentStatus.UNAUTHORIZED, notes: 'Pagamento não autorizado pela operadora.' }; }
    }
};

const getCardBrand = (cardNumber: string): string => {
  if (cardNumber.startsWith('4')) return 'Visa';
  if (cardNumber.startsWith('5')) return 'Mastercard';
  if (cardNumber.startsWith('34') || cardNumber.startsWith('37')) return 'American Express';
  return 'Outros';
};

export const changeUserPlan = async (userId: string, changeData: ChangePlanDTO) => {
  const { newPlanId, isMonthly, cardDetails } = changeData;
  try {
    const currentSubscription = await prisma.subscription.findFirst({
      where: { userId: userId, status: SubscriptionStatus.ACTIVE },
      orderBy: { startDate: 'desc' },
      include: { plan: true },
    });

    if (!currentSubscription) { throw new Error('Usuário não possui um plano ativo para ser alterado.'); }

    const newPlan = await prisma.plan.findUnique({
      where: { id: newPlanId },
      select: { id: true, name: true, monthlyValue: true, annualValue: true },
    });
    
    if (!newPlan || !newPlan.name) { throw new Error('Novo plano não encontrado.'); }
    if (newPlan.id === currentSubscription.planId) { throw new Error('O novo plano é o mesmo que o plano atual. Nenhuma alteração necessária.'); }

    let operationType: OperationType;
    let valueToPay: Decimal = new Decimal(0);
    let requiresPayment = false;

    const currentPlanValue = currentSubscription.isMonthly
      ? (currentSubscription.plan.monthlyValue ?? new Decimal(0))
      : (currentSubscription.plan.annualValue ?? currentSubscription.plan.monthlyValue?.mul(new Decimal(12)) ?? new Decimal(0));

    const newPlanValue = isMonthly
      ? (newPlan.monthlyValue ?? new Decimal(0))
      : (newPlan.annualValue ?? newPlan.monthlyValue?.mul(new Decimal(12)) ?? new Decimal(0));

    if (newPlanValue.greaterThan(currentPlanValue)) {
      operationType = OperationType.UPGRADE;
      valueToPay = newPlanValue;
      requiresPayment = true;
    } else if (newPlanValue.lessThan(currentPlanValue)) {
      operationType = OperationType.DOWNGRADE;
      valueToPay = new Decimal(0);
      requiresPayment = true;
    } else {
      operationType = OperationType.UPGRADE;
      valueToPay = new Decimal(0);
      requiresPayment = false;
    }

    if (requiresPayment && (!cardDetails || !cardDetails.cardNumber)) {
        throw new Error('Detalhes do cartão são obrigatórios para esta alteração de plano.');
    }

    let paymentStatus: PaymentStatus = PaymentStatus.PAID;
    let paymentNotes = 'Operação de plano concluída sem custo adicional.';
    let purchaseHistoryEntry: any;

    if (requiresPayment && cardDetails && valueToPay !== null) {
      const paymentResult = simulatePayment(cardDetails, valueToPay, false);
      paymentStatus = paymentResult.status;
      paymentNotes = paymentResult.notes;

      purchaseHistoryEntry = await prisma.purchaseHistory.create({
        data: {
          userId: userId, planId: newPlan.id, operationType: operationType,
          paidValue: valueToPay, paymentStatus: paymentStatus, notes: paymentNotes,
        },
      });
    } else if (!requiresPayment) {
        purchaseHistoryEntry = await prisma.purchaseHistory.create({
            data: {
                userId: userId, planId: newPlan.id, operationType: operationType,
                paidValue: new Decimal(0), paymentStatus: PaymentStatus.PAID,
                notes: `Alteração de plano (${operationType}) sem custo adicional.`,
            },
        });
    }

    if (paymentStatus === PaymentStatus.PAID) {
      await prisma.subscription.update({
        where: { id: currentSubscription.id },
        data: { status: SubscriptionStatus.INACTIVE, endDate: new Date() },
      });
      const newSubscription = await prisma.subscription.create({
        data: {
          userId: userId, planId: newPlan.id, isMonthly: isMonthly, status: SubscriptionStatus.ACTIVE,
          startDate: new Date(), lastChargeDate: new Date(),
          paymentMethod: cardDetails ? `${getCardBrand(cardDetails.cardNumber)} - final ${cardDetails.cardNumber.slice(-4)}` : currentSubscription.paymentMethod,
        },
      });
      return {
        status: 'success', message: `Plano alterado para ${newPlan.name} com sucesso!`,
        operationType: operationType, subscription: newSubscription, purchaseHistory: purchaseHistoryEntry,
      };
    } else {
      return {
        status: 'failed', message: paymentNotes, operationType: operationType, purchaseHistory: purchaseHistoryEntry,
      };
    }
  } catch (error: any) {
    console.error(`Erro no serviço 'changeUserPlan' para o usuário ${userId}:`, error);
    if (error.message.includes('não possui um plano ativo')) { throw new Error('Não foi possível alterar o plano: ' + error.message); }
    if (error.message.includes('O novo plano é o mesmo')) { throw new Error('Não foi possível alterar o plano: ' + error.message); }
    if (error.message.includes('Detalhes do cartão são obrigatórios')) { throw new Error('Não foi possível alterar o plano: ' + error.message); }
    throw new Error(`Falha ao alterar o plano: ${error.message || 'Erro desconhecido'}`);
  }
};