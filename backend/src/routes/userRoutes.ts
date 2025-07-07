import { Router } from 'express';
import { createPurchase, getUserCurrentPlan } from '../controllers/userController';

const router = Router();


/**
 * @route GET /plans/:id
 * @description Rota para obter detalhes de um plano específico por ID.
 */
router.get('/:userId/plan', getUserCurrentPlan)

/**
 * @route POST /users/:userId/purchase
 * @description Rota para processar a compra de um plano de assinatura.
 */
router.post('/:userId/purchase', createPurchase);

export default router;