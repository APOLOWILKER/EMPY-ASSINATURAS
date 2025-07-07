import { Request, Response } from 'express';
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