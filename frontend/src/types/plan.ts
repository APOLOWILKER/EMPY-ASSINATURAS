import { z } from 'zod';
import { PlanSchema } from '../pages/AccessPlans/schemas/planCardSchemas';


export type Plan = z.infer<typeof PlanSchema>;