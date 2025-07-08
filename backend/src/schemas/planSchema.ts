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


  // `description` (Título Interno/Privado) - Opcional
  description: z.string().optional(),

  // `monthlyValue` (Preço Mensal) - Opcional na requisição, mas um dos dois (mensal ou anual) deve existir
  monthlyValue: z.number().optional()
    .refine(val => val === undefined || val >= 0, {
      message: 'O valor mensal deve ser um número não negativo.'
    }),

  // `annualValue` (Preço Anual) - Opcional na requisição, mas um dos dois (mensal ou anual) deve existir
  annualValue: z.number().optional()
    .refine(val => val === undefined || val >= 0, {
      message: 'O valor anual deve ser um número não negativo.'
    }),

  // `discountPercent` (Desconto em porcentagem) - Opcional
  discountPercent: z.number().optional()
    .refine(val => val === undefined || (val >= 0 && val <= 100), {
      message: 'O desconto deve ser um número entre 0 e 100.'
    }),

  // `planBaseId` (ID do Plano Base) - Opcional, mas se fornecido, deve ser um UUID válido
  planBaseId: z.string().uuid('ID do plano base inválido.').optional(),

  // `isActive` e `isCustom` podem ser derivados ou opcionais para o admin criar um rascunho
  isActive: z.boolean().optional().default(true), 
  isCustom: z.boolean().optional().default(true), 

  // `onlineCredits` e `offlineCredits` - Opcional, mas se fornecido, deve ser um número não negativo
  onlineCredits: z.number().optional(),
  offlineCredits: z.number().optional(),
}).refine(data => data.monthlyValue !== undefined || data.annualValue !== undefined, {
  message: 'Pelo menos um dos valores (mensal ou anual) deve ser fornecido.',
  path: ['monthlyValue', 'annualValue'],
});



// Tipo TypeScript inferido a partir do schema Zod
export type CreatePlanDTO = z.infer<typeof createPlanSchema>;

