import { Router } from 'express';
import { getAllPurchases } from '../controllers/userController';

const router = Router();

/**
 * @route GET /purchases/management
 * @description Rota para listar o histórico de todas as compras de TODOS os usuários para o gerenciamento.
 */
router.get('/management', getAllPurchases); 

export default router;