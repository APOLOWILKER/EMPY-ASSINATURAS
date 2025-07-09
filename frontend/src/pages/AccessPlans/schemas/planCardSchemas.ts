import { Plan } from "types/plan";
import { z } from 'zod';


export interface PlanCardProps {
  plan: Plan;
  onSubscribe: (plan: Plan, isMonthly: boolean) => void;
}

export const PlanSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, 'Nome do plano é obrigatório.'),
  description: z.string().optional(),

  monthlyValue: z.preprocess(
    (val) => {
      if (typeof val === 'string') {
      
        return parseFloat(val.replace(',', '.'));
      }
      return val; 
    },
    z.number().positive('Valor mensal deve ser um número positivo.').optional().nullable()  ),
  annualValue: z.preprocess(
    (val) => {
      if (typeof val === 'string') {
    
        return parseFloat(val.replace(',', '.'));
      }
      return val;
    },
    z.number().positive('Valor anual deve ser um número positivo.').optional().nullable()
  ),

  discountPercent: z.number().int().optional().nullable(),
  onlineCredits: z.number().int(),
  offlineCredits: z.number().int(),
  isActive: z.boolean().default(true),
  isCustom: z.boolean().default(false),

  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const PlansArraySchema = z.array(PlanSchema);