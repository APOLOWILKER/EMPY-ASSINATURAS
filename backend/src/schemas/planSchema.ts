import { z } from 'zod';

/**
 * @description Schema Zod para validar os dados de entrada ao criar um novo plano.
 * Os campos aqui refletem os inputs da tela "Criar Plano".
 * Lembre-se: 'monthlyValue' e 'annualValue' são opcionais NO DB, mas pelo menos um deve ser fornecido.
 * A validação de 'pelo menos um' será tratada na lógica do serviço/controlador.
 */
export const createPlanSchema = z.object({
  name: z.string({
    required_error: 'O nome do plano é obrigatório.',
    invalid_type_error: 'O nome do plano deve ser uma string.',
  }).min(3,'O nome do plano deve ter pelo menos 3 caracteres.'),


  
  description: z.string().optional(),

  
  monthlyValue: z.number().optional()
    .refine(val => val === undefined || val >= 0, {
      message: 'O valor mensal deve ser um número não negativo.'
    }),

  
  annualValue: z.number().optional()
    .refine(val => val === undefined || val >= 0, {
      message: 'O valor anual deve ser um número não negativo.'
    }),

  
  discountPercent: z.number().optional()
    .refine(val => val === undefined || (val >= 0 && val <= 100), {
      message: 'O desconto deve ser um número entre 0 e 100.'
    }),

  
  planBaseId: z.string().uuid('ID do plano base inválido.').optional(),

  
  isActive: z.boolean().optional().default(true), 
  isCustom: z.boolean().optional().default(true), 

  
  onlineCredits: z.number().optional(),
  offlineCredits: z.number().optional(),
}).refine(data => data.monthlyValue !== undefined || data.annualValue !== undefined, {
  message: 'Pelo menos um dos valores (mensal ou anual) deve ser fornecido.',
  path: ['monthlyValue', 'annualValue'],
});




export type CreatePlanDTO = z.infer<typeof createPlanSchema>;

