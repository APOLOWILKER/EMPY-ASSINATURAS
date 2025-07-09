import { z } from 'zod';

// Esquema Zod para um plano individual
export const PlanSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, 'Nome do plano é obrigatório.'),
  description: z.string().optional(),

  // monthlyValue e annualValue são decimais no Prisma, que podem vir como string ou number.
  // Usamos preprocess para garantir que sejam números, tratando vírgulas se necessário.
  monthlyValue: z.preprocess(
    (val) => {
      if (typeof val === 'string') {
        // Trata string como "10,50" ou "10.50"
        return parseFloat(val.replace(',', '.'));
      }
      return val; // Já é um number ou undefined/null
    },
    z.number().positive('Valor mensal deve ser um número positivo.').optional().nullable() // Pode ser opcional e nulo
  ),
  annualValue: z.preprocess(
    (val) => {
      if (typeof val === 'string') {
        // Trata string como "10,50" ou "10.50"
        return parseFloat(val.replace(',', '.'));
      }
      return val;
    },
    z.number().positive('Valor anual deve ser um número positivo.').optional().nullable() // Pode ser opcional e nulo
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