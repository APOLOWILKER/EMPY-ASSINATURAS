import { Router } from 'express';
import { getPlans, getPlansForManagement } from '../controllers/planController';

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
router.get('/management', getPlansForManagement); // <--- ESTA É A NOVA ROTA

export default router;