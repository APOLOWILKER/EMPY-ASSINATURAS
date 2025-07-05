"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const planController_1 = require("../controllers/planController");
const router = (0, express_1.Router)();
/**
 * @route GET /plans
 * @description Rota para listar todos os planos de assinatura disponíveis para o cliente.
 */
router.get('/', planController_1.getPlans);
exports.default = router;
