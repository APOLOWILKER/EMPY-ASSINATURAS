// frontend/src/types/index.ts

// --- Interfaces para Modelos e DTOs (alinhadas ao backend) ---

export interface Plan {
  id: string;
  name: string;
  description: string | null;
  monthlyValue: number; // Converte de Decimal (string) para number
  annualValue: number | null; // Converte de Decimal (string) para number
  onlineCredits: number;
  offlineCredits: number;
  isCustom: boolean;
}

export interface Subscription {
  id: string;
  userId: string;
  planId: string;
  isMonthly: boolean;
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING' | 'CANCELED';
  startDate: string;
  endDate: string | null;
  lastChargeDate: string | null;
  paymentMethod: string | null;
  plan?: Plan; // Pode ser incluído em algumas respostas
  user?: User; // Pode ser incluído em algumas respostas
}

export interface PurchaseHistory {
  id: string;
  userId: string;
  planId: string;
  operationType: 'PURCHASE' | 'UPGRADE' | 'DOWNGRADE';
  paidValue: number; // Converte de Decimal (string) para number
  paymentStatus: 'PAID' | 'REJECTED_INSUFFICIENT_FUNDS' | 'UNAUTHORIZED' | 'GENERAL_FAILURE' | 'PENDING';
  transactionDate: string;
  receiptUrl: string | null;
  notes: string | null;
  plan?: Plan; // Pode ser incluído em algumas respostas
  user?: User; // Pode ser incluído em algumas respostas
}

export interface User {
  id: string;
  name: string | null;
  email: string | null;
}

export interface CreditCardDetails {
  holderName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

export interface CreatePurchaseDTO {
  planId: string;
  isMonthly: boolean;
  cardDetails: CreditCardDetails;
  userEmail?: string;
}

export interface ChangePlanDTO {
  newPlanId: string;
  isMonthly: boolean;
  cardDetails?: CreditCardDetails;
}

// Interface para o resultado de operações de compra/alteração do backend
export interface PurchaseResult {
  message: string;
  subscription?: Subscription;
  purchaseHistory: PurchaseHistory;
  status: 'success' | 'failed'; // Status da operação
  operationType?: 'PURCHASE' | 'UPGRADE' | 'DOWNGRADE'; // Tipo de operação
}