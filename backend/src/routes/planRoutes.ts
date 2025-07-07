import { Router } from 'express';
import { createPlan, getPlans, getPlansForManagement, getUserCurrentPlan } from '../controllers/planController';

const router = Router();

/**
 * @route GET /plans
 * @description Rota para listar todos os planos de assinatura disponíveis para o cliente.
 */

router.get('/', getPlans)

/**
 * @route GET /plans/management
 * @description Rota para listar TODOS os planos de assinatura para o painel de gerenciamento.
 */
router.get('/management', getPlansForManagement);

/**
 * @route POST /plans/management
 * @description Rota para criar um novo plano de assinatura.
 */
router.post('/management', createPlan);


/**
 * @route GET /plans/:id
 * @description Rota para obter detalhes de um plano específico por ID.
 */
router.get('/:userId/plan', getUserCurrentPlan)


export default router;