import { z } from 'zod';

export const creditCardSchema = z.object({
  holderName: z.string().min(3, 'Nome do titular deve ter no mínimo 3 caracteres.'),
  cardNumber: z.string().length(16, 'Número do cartão deve ter 16 dígitos.').regex(/^\d+$/, 'Número do cartão deve conter apenas dígitos.'),
  expiryDate: z.string().length(5, 'Data de validade deve estar no formato MM/AA.').regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, 'Data de validade inválida (MM/AA).'),
  cvv: z.string().length(3, 'CVV deve ter 3 dígitos.').regex(/^\d+$/, 'CVV deve conter apenas dígitos.'),
});

export const createPurchaseSchema = z.object({
  planId: z.string().uuid('ID do plano inválido.'),
  isMonthly: z.boolean(),
  cardDetails: creditCardSchema,
  userEmail: z.string().email('Email do usuário inválido.').optional(),
});

export type CreatePurchaseDTO = z.infer<typeof createPurchaseSchema>;
export type CreditCardDetails = z.infer<typeof creditCardSchema>;