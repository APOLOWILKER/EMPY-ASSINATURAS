import { Router } from 'express';
import { changeUserPlan, createPurchase, getUserCurrentPlan, getUserHistory } from '../controllers/userController';

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

/**
 * @route POST /users/:userId/change-plan
 * @description Rota para gerenciar o upgrade ou downgrade de um plano de assinatura.
 */
router.post('/:userId/change-plan', changeUserPlan);

/**
 * @route GET /users/:userId/history
 * @description Rota para listar o histórico completo de compras de um usuário.
 */
router.get('/:userId/history', getUserHistory);

export default router;