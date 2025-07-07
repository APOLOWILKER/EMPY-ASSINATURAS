import { Request, Response } from 'express';
import { ZodError } from "zod";
import { createPurchaseSchema } from "../schemas/purchaseSchemas";
import * as userService from '../services/userServices';


/**
 * @function getUserCurrentPlan
 * @description Controlador para a rota GET /plans/current. Busca o plano atual do usuário autenticado.
 * @param {Request} req - Objeto de requisição do Express (espera o ID do usuário no token de autenticação).
 * @param {Response} res - Objeto de resposta do Express.
 * @returns {Promise<void>} Uma Promise que resolve quando a resposta é enviada ao cliente.
 */
export const getUserCurrentPlan = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const userPlan = await userService.getUserCurrentPlan(userId);

    if (!userPlan) {
      return res.status(404).json({ message: 'Plano atual não encontrado para o usuário.' });
    }

    return res.status(200).json(userPlan);
  } catch (error: any) {
    console.error('Erro no controlador `getUserCurrentPlan` ao buscar plano do usuário:', error.message);
    return res.status(500).json({ message: error.message || 'Erro interno do servidor ao buscar plano do usuário.' });
  }
}

/**
 * @function createPurchase
 * @description Controlador para a rota POST /users/:userId/purchase. Gerencia a compra de um plano.
 * @param {Request} req - Objeto de requisição do Express (espera userId nos parâmetros e dados da compra no corpo).
 * @param {Response} res - Objeto de resposta do Express.
 * @returns {Promise<void>} Uma Promise que resolve quando a resposta é enviada ao cliente.
 */
export const createPurchase = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const purchaseData = createPurchaseSchema.parse(req.body); // Validação Zod

    const result = await userService.createPurchase(userId, purchaseData);

    if (result.status === 'success') {
      return res.status(201).json({
        message: result.message,
        subscription: result.subscription,
        purchaseHistory: result.purchaseHistory,
      });
    } else {
      return res.status(402).json({ // 402 Payment Required
        message: result.message,
        purchaseHistory: result.purchaseHistory,
      });
    }

  } catch (error: any) {
    if (error instanceof ZodError) {
      console.error('Erro de validação Zod na compra:', error.errors);
      return res.status(400).json({
        message: 'Dados de compra inválidos.',
        errors: error.errors,
      });
    }
    console.error('Erro no controlador createPurchase:', error.message);
    return res.status(500).json({ message: error.message || 'Erro interno do servidor ao processar a compra.' });
  }
};