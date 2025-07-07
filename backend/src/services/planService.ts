import { PrismaClient } from '../generated/prisma';
import { CreatePlanDTO } from "../schemas/planSchema";

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
export const listAllPlansForManagement = async () => {
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

/**
 * @function createPlan
 * @description Cria um novo plano de assinatura no banco de dados.
 * @param {CreatePlanDTO} planData - Dados do plano a ser criado, validados pelo Zod.
 * @returns {Promise<Plan>} Uma Promise que resolve para o objeto Plan criado.
 * @throws {Error} Lança um erro se houver falha na criação ou violação de unicidade (nome).
 */
export const createPlan = async (planData: CreatePlanDTO) => { // <--- NOVA FUNÇÃO AQUI
  try {
    // Lógica para herdar créditos ou outras configurações do plano base, se 'planBaseId' for fornecido
    let finalOnlineCredits = planData.onlineCredits;
    let finalOfflineCredits = planData.offlineCredits;
    let finalIsCustom = planData.isCustom ?? true; // Default para true se não fornecido

    if (planData.planBaseId) {
      const basePlan = await prisma.plan.findUnique({
        where: { id: planData.planBaseId },
        select: { onlineCredits: true, offlineCredits: true, isCustom: true }
      });

      if (!basePlan) {
        throw new Error('Plano base não encontrado.');
      }
      // Se não foram fornecidos créditos específicos, herda do plano base
      finalOnlineCredits = planData.onlineCredits ?? basePlan.onlineCredits;
      finalOfflineCredits = planData.offlineCredits ?? basePlan.offlineCredits;
      // Se o plano base é base (isCustom=false), e o novo plano é criado baseado nele,
      // o novo plano ainda é considerado customizado, a menos que explicitamente sobrescrito.
      finalIsCustom = planData.isCustom ?? true;
    }

    // Se os créditos ainda não foram definidos (nem por input, nem por plano base), use um default
    // Assumimos que todo plano tem créditos, mesmo que zero.
    if (finalOnlineCredits === undefined || finalOnlineCredits === null) {
      finalOnlineCredits = 0;
    }
    if (finalOfflineCredits === undefined || finalOfflineCredits === null) {
      finalOfflineCredits = 0;
    }


    const newPlan = await prisma.plan.create({
      data: {
        name: planData.name,
        description: planData.description,
        monthlyValue: planData.monthlyValue,
        annualValue: planData.annualValue,
        discountPercent: planData.discountPercent,
        onlineCredits: finalOnlineCredits, // Usa o valor final (input ou herdado ou default)
        offlineCredits: finalOfflineCredits, // Usa o valor final
        isActive: planData.isActive,
        isCustom: finalIsCustom,
      },
    });
    return newPlan;
  } catch (error: any) {
    if (error.code === 'P2002' && error.meta?.target?.includes('name')) {
      throw new Error('Já existe um plano com este nome.'); // Erro de unicidade do Prisma
    }
    console.error('Erro no serviço `createPlan` ao criar plano:', error);
    throw new Error('Falha ao criar o plano de assinatura.');
  }
};