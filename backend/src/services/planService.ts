import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

/**
 * @function listAllPlans
 * @description Lista todos os planos de assinatura ativos disponíveis para os clientes.
 * @returns {Promise<Array>} Uma Promise que resolve para um array de objetos Planos.
 * @throws {Error} Lança um erro se houver falha na comunicação com o banco de dados.
 */
export const listAllPlans = async () => {
  try {
    const plans = await prisma.plan.findMany({
      where: {
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        description: true,
        monthlyValue: true,
        annualValue: true,
        onlineCredits: true,
        offlineCredits: true,
        isCustom: true,
      },
      orderBy: {
        monthlyValue: 'asc',
      },
    });
    return plans;
  } catch (error) {
    console.error('Erro no serviço `listAllPlans` ao buscar planos:', error);
    throw new Error('Falha ao buscar planos de assinatura.');
  }
};