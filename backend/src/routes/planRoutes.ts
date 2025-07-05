import { Router } from 'express';
import { getPlans } from '../controllers/planController';

const router = Router();

/**
 * @route GET /plans
 * @description Rota para listar todos os planos de assinatura disponíveis para o cliente.
 */
router.get('/', getPlans);

export default router;