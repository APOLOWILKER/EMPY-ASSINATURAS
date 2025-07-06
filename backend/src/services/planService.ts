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

/**
 * @function listAllPlansForManagement
 * @description Lista TODOS os planos de assinatura (ativos e inativos, base e customizados) para visualização no painel de gerenciamento.
 * @returns {Promise<Array>} Uma Promise que resolve para um array de objetos Planos com todos os detalhes.
 * @throws {Error} Lança um erro se houver falha na comunicação com o banco de dados.
 */
export const listAllPlansForManagement = async () => { // <--- ESTA É A NOVA FUNÇÃO
  try {
    const plans = await prisma.plan.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        monthlyValue: true,
        annualValue: true,
        discountPercent: true,
        onlineCredits: true,
        offlineCredits: true,
        isActive: true,
        isCustom: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
    return plans;
  } catch (error) {
    console.error('Erro no serviço `listAllPlansForManagement` ao buscar planos:', error);
    throw new Error('Falha ao buscar todos os planos para o gerenciamento.');
  }
};