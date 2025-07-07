// backend/src/routes/userRoutes.ts

import { Router } from 'express';
import { getUserCurrentPlan } from '../controllers/userController';

const router = Router();


/**
 * @route GET /plans/:id
 * @description Rota para obter detalhes de um plano específico por ID.
 */
router.get('/:userId/plan', getUserCurrentPlan)


export default router;