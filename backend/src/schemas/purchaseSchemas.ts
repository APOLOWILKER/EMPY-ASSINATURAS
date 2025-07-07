// backend/src/schemas/purchaseSchema.ts

import { z } from 'zod';

// Schema para validar os dados do cartão de crédito (fictícios)
export const creditCardSchema = z.object({
  holderName: z.string().min(3, 'Nome do titular deve ter no mínimo 3 caracteres.'),
  cardNumber: z.string().length(16, 'Número do cartão deve ter 16 dígitos.').regex(/^\d+$/, 'Número do cartão deve conter apenas dígitos.'),
  expiryDate: z.string().length(5, 'Data de validade deve estar no formato MM/AA.').regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, 'Data de validade inválida (MM/AA).'), // MM/YY
  cvv: z.string().length(3, 'CVV deve ter 3 dígitos.').regex(/^\d+$/, 'CVV deve conter apenas dígitos.'),
});

// Schema para validar os dados de entrada para a compra de um plano
export const createPurchaseSchema = z.object({
  planId: z.string().uuid('ID do plano inválido.'),
  isMonthly: z.boolean(), // true para mensal, false para anual
  cardDetails: creditCardSchema, // Detalhes do cartão de crédito
  userEmail: z.string().email('Email do usuário inválido.').optional(), // Email para identificação/cobrança, se necessário criar o usuário
});

export type CreatePurchaseDTO = z.infer<typeof createPurchaseSchema>;
export type CreditCardDetails = z.infer<typeof creditCardSchema>;