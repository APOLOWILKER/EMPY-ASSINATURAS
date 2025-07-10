import { z } from 'zod';
import { PlanSchema } from '../pages/AccessPlans/schemas/planCardSchemas';

// Gera o tipo TypeScript a partir do esquema Zod
export type Plan = z.infer<typeof PlanSchema>;