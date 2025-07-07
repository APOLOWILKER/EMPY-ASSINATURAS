import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();


/**
 * @function getUserCurrentPlan
 * @description Busca o plano de assinatura ativo atual de um usuário específico.
 * @param {string} userId - O ID único do usuário.
 * @returns {Promise<any | null>} Uma Promise que resolve para o plano ativo do usuário (Subscription com Plan), ou null se não houver.
 * @throws {Error} Lança um erro se houver falha na comunicação com o banco de dados.
 */
export const getUserCurrentPlan = async (userId: string) => { 
  try {
    const currentSubscription = await prisma.subscription.findFirst({
      where: {
        userId: userId,
        status: 'ACTIVE',
      },
      orderBy: {
        startDate: 'desc',
      },
      select: { 
        id: true,
        isMonthly: true,
        status: true,
        startDate: true,
        endDate: true,
        lastChargeDate: true,
        paymentMethod: true,
        plan: { 
          select: {
            id: true,
            name: true,
            description: true,
            monthlyValue: true,
            annualValue: true,
            onlineCredits: true,
            offlineCredits: true,
          },
        },
        user: { 
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (currentSubscription) {
      return currentSubscription;
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Erro no serviço 'getUserCurrentPlan' para o usuário ${userId}:`, error);
    throw new Error('Falha ao buscar o plano atual do usuário.');
  }
};