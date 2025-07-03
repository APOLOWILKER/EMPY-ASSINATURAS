import { z } from "zod";

export const PlanCardSchema = z.object({
  title: z.string(),
  annualPrice: z.string(),
  monthlyPrice: z.string(),
  features: z.array(z.string()),
  isPopular: z.boolean().optional(),
});

// Gera o tipo automaticamente com base no schema
export type PlanCardProps = z.infer<typeof PlanCardSchema>;
