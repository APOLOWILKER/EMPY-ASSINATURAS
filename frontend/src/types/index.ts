

export interface Plan {
  id: string;
  name: string;
  description: string | null;
  monthlyValue: number;
  annualValue: number | null;
  onlineCredits: number;
  offlineCredits: number;
  isCustom: boolean;
  isActive: boolean; 
  createdAt: string; 
  updatedAt: string; 
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
  plan?: Plan;
  user?: User;
}

export interface PurchaseHistory {
  id: string;
  userId: string;
  planId: string;
  operationType: 'PURCHASE' | 'UPGRADE' | 'DOWNGRADE';
  paidValue: number;
  paymentStatus: 'PAID' | 'REJECTED_INSUFFICIENT_FUNDS' | 'UNAUTHORIZED' | 'GENERAL_FAILURE' | 'PENDING';
  transactionDate: string;
  receiptUrl: string | null;
  notes: string | null;
  plan?: Plan;
  user?: User;
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

export interface PurchaseResult {
  message: string;
  subscription?: Subscription;
  purchaseHistory: PurchaseHistory;
  status: string;
  operationType?: 'PURCHASE' | 'UPGRADE' | 'DOWNGRADE';
}