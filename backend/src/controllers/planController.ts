import { Request, Response } from 'express';
import { ZodError } from "zod";
import { createPlanSchema } from "../schemas/planSchema";
import * as planService from '../services/planService';

/**
 * @function getPlans
 * @description Controlador para a rota GET /plans. Busca e retorna todos os planos ativos.
 * @param {Request} req - Objeto de requisição do Express.
 * @param {Response} res - Objeto de resposta do Express.
 * @returns {Promise<void>} Uma Promise que resolve quando a resposta é enviada ao cliente.
 */

export const getPlans = async (req: Request, res: Response) => {
  try {
    const plans = await planService.listAllPlans();
    return res.status(200).json(plans);
  } catch (error: any) {
    console.error('Erro no controlador `getPlans` ao processar requisição:', error.message);
    return res.status(500).json({ message: error.message || 'Erro interno do servidor.' });
  }
};

/**
 * @function getPlansForManagement
 * @description Controlador para a rota GET /plans/management. Busca e retorna TODOS os planos para o painel de gerenciamento.
 * @param {Request} req - Objeto de requisição do Express.
 * @param {Response} res - Objeto de resposta do Express.
 * @returns {Promise<void>} Uma Promise que resolve quando a resposta é enviada ao cliente.
 */
export const getPlansForManagement = async (req: Request, res: Response) => {
  try {
    const plans = await planService.listAllPlansForManagement();
    return res.status(200).json(plans);
  } catch (error: any) {
    console.error('Erro no controlador `getPlansForManagement` ao processar requisição:', error.message);
    return res.status(500).json({ message: error.message || 'Erro interno do servidor para o gerenciamento de planos.' });
  }
};

/**
 * @function createPlan
 * @description Controlador para a rota POST /plans/management. Cria um novo plano de assinatura.
 * @param {Request} req - Objeto de requisição do Express (espera o corpo da requisição com dados do plano).
 * @param {Response} res - Objeto de resposta do Express.
 * @returns {Promise<void>} Uma Promise que resolve quando a resposta é enviada ao cliente.
 */
export const createPlan = async (req: Request, res: Response) => {
  try {
    // 1. Validação em tempo de execução com Zod
    // O método .parse() do Zod lançará um erro se os dados não corresponderem ao schema
    const planData = createPlanSchema.parse(req.body); // planData terá o tipo CreatePlanDTO

    // 2. Chama a função do serviço para criar o plano no DB
    const newPlan = await planService.createPlan(planData);

    // 3. Retorna o plano criado com status 201 Created
    return res.status(201).json(newPlan);

  } catch (error: any) {
    // Tratamento específico para erros de validação do Zod
    if (error instanceof ZodError) {
      console.error('Erro de validação Zod ao criar plano:', error.errors);
      return res.status(400).json({
        message: 'Dados de plano inválidos.',
        errors: error.errors, // Envia detalhes dos erros de validação
      });
    }
    // Tratamento para outros erros (ex: erros do serviço, como plano com nome duplicado)
    console.error('Erro no controlador `createPlan` ao criar plano:', error.message);
    return res.status(500).json({ message: error.message || 'Erro interno do servidor ao criar o plano.' });
  }
};