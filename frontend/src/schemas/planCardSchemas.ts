// src/schemas/planCardSchema.ts
import { z } from 'zod';

export const PlanCardSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  annualPrice: z.string().regex(/^\d+,\d{2}$/, "Formato de preço inválido (ex: 130,83)"),
  monthlyPrice: z.string().regex(/^\d+,\d{2}$/, "Formato de preço inválido (ex: 157,00)"),
  features: z.array(
    z.string().min(1, "Benefício não pode ser vazio")
  ).min(1, "Pelo menos um benefício é necessário"),
  isPopular: z.boolean().optional().default(false)
});

export type PlanCardProps = z.infer<typeof PlanCardSchema>;