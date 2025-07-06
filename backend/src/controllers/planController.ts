import { Request, Response } from 'express';
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
export const getPlansForManagement = async (req: Request, res: Response) => { // <--- ESTE É O NOVO CONTROLADOR
  try {
    const plans = await planService.listAllPlansForManagement(); // Chama a nova função do serviço
    return res.status(200).json(plans);
  } catch (error: any) {
    console.error('Erro no controlador `getPlansForManagement` ao processar requisição:', error.message);
    return res.status(500).json({ message: error.message || 'Erro interno do servidor para o gerenciamento de planos.' });
  }
};