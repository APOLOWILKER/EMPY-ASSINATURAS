"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listAllPlans = void 0;
const prisma_1 = require("../generated/prisma");
const prisma = new prisma_1.PrismaClient();
/**
 * @function listAllPlans
 * @description Lista todos os planos de assinatura ativos disponíveis para os clientes.
 * @returns {Promise<Array>} Uma Promise que resolve para um array de objetos Planos.
 * @throws {Error} Lança um erro se houver falha na comunicação com o banco de dados.
 */
const listAllPlans = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const plans = yield prisma.plan.findMany({
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
    }
    catch (error) {
        console.error('Erro no serviço `listAllPlans` ao buscar planos:', error);
        throw new Error('Falha ao buscar planos de assinatura.');
    }
});
exports.listAllPlans = listAllPlans;
