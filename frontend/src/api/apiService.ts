// frontend/src/api/apiService.ts

import axios from 'axios'; // Importa Axios
// Se você receber um erro aqui, verifique se instalou "@types/axios" com npm install -D @types/axios

const API_BASE_URL = 'http://localhost:3001'; // URL base do seu backend

// --- Interfaces para Modelos e DTOs (alinhadas ao backend) ---
// Interfaces para planos (dados recebidos do GET /plans)
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

// Interfaces para Assinaturas (dados recebidos/enviados)
export interface Subscription {
  id: string;
  userId: string;
  planId: string;
  isMonthly: boolean;
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING' | 'CANCELED'; // Ou use o enum correto do backend
  startDate: string; // Ou Date
  endDate: string | null;
  lastChargeDate: string | null;
  paymentMethod: string | null;
  plan?: Plan; // Pode ser incluído em algumas respostas
  user?: User; // Pode ser incluído em algumas respostas
}

// Interfaces para Histórico de Compras (dados recebidos)
export interface PurchaseHistory {
  id: string;
  userId: string;
  planId: string;
  operationType: 'PURCHASE' | 'UPGRADE' | 'DOWNGRADE'; // Ou use o enum correto
  paidValue: number; // Converte de Decimal (string) para number
  paymentStatus: 'PAID' | 'REJECTED_INSUFFICIENT_FUNDS' | 'UNAUTHORIZED' | 'GENERAL_FAILURE' | 'PENDING'; // Ou use o enum correto
  transactionDate: string; // Ou Date
  receiptUrl: string | null;
  notes: string | null;
  plan?: Plan; // Pode ser incluído em algumas respostas
  user?: User; // Pode ser incluído em algumas respostas
}

// Interfaces para Usuário (dados básicos recebidos)
export interface User {
  id: string;
  name: string | null;
  email: string | null;
}

// Interfaces para Detalhes do Cartão (dados enviados para compra/alteração)
export interface CreditCardDetails {
  holderName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

// Interfaces para DTOs de Requisição de Compra/Alteração
export interface CreatePurchaseDTO {
  planId: string;
  isMonthly: boolean;
  cardDetails: CreditCardDetails;
  userEmail?: string;
}

export interface ChangePlanDTO {
  newPlanId: string;
  isMonthly: boolean;
  cardDetails?: CreditCardDetails; // Opcional, pois algumas alterações podem não precisar de pagamento
}

// Interface para o resultado de operações de compra/alteração do backend
export interface PurchaseResult {
  message: string;
  subscription?: Subscription;
  purchaseHistory: PurchaseHistory;
  status: string; // 'success' or 'failed' (do retorno da API)
  operationType?: 'PURCHASE' | 'UPGRADE' | 'DOWNGRADE'; // Tipo de operação
}


// --- Funções Auxiliares de Parsing (converte Decimal de string para number) ---
// O backend envia Decimal como string, o frontend usa number
const parseDecimalFields = (obj: any): any => { // Uso de 'any' aqui é para flexibilidade na conversão
  if (!obj) return obj;

  const newObj = { ...obj };

  if (typeof newObj.monthlyValue === 'string') {
    newObj.monthlyValue = parseFloat(newObj.monthlyValue);
  }
  if (typeof newObj.annualValue === 'string' && newObj.annualValue !== null) {
    newObj.annualValue = parseFloat(newObj.annualValue);
  }
  if (typeof newObj.paidValue === 'string') {
    newObj.paidValue = parseFloat(newObj.paidValue);
  }
  // Recursivamente aplica para objetos aninhados (plan, user, subscription, purchaseHistory)
  if (newObj.plan) { newObj.plan = parseDecimalFields(newObj.plan); }
  if (newObj.user) { newObj.user = parseDecimalFields(newObj.user); }
  if (newObj.subscription) { newObj.subscription = parseDecimalFields(newObj.subscription); }
  if (newObj.purchaseHistory) { newObj.purchaseHistory = parseDecimalFields(newObj.purchaseHistory); }

  return newObj;
};


// --- Funções de API ---

export const getPlans = async (): Promise<Plan[]> => {
  try {
    const response = await axios.get<Plan[]>(`${API_BASE_URL}/plans`);
    return response.data.map(plan => parseDecimalFields(plan));
  } catch (error: any) {
    console.error('Erro ao chamar a API GET /plans:', error.message);
    throw new Error(error.response?.data?.message || 'Falha ao buscar planos.');
  }
};

export const createPurchase = async (userId: string, purchaseData: CreatePurchaseDTO): Promise<PurchaseResult> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/${userId}/purchase`, purchaseData);
    const data: PurchaseResult = parseDecimalFields(response.data);
    return data;
  } catch (error: any) {
    console.error('Erro ao chamar a API POST /users/:userId/purchase:', error.message);
    throw new Error(error.response?.data?.message || 'Falha ao processar a compra.');
  }
};

export const changePlan = async (userId: string, changeData: ChangePlanDTO): Promise<PurchaseResult> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users/${userId}/change-plan`, changeData); // Permanece POST
      const data: PurchaseResult = parseDecimalFields(response.data);
      return data;
    } catch (error: any) {
      console.error('Erro ao chamar a API POST /users/:userId/change-plan:', error.message);
      throw new Error(error.response?.data?.message || 'Falha ao alterar o plano.');
    }
};

export const getUserCurrentPlan = async (userId: string): Promise<Subscription | null> => {
    try {
        const response = await axios.get<Subscription>(`${API_BASE_URL}/users/${userId}/plan`);
        if (response.status === 404) { return null; }
        return parseDecimalFields(response.data);
    } catch (error: any) {
        console.error('Erro ao chamar a API GET /users/:userId/plan:', error.message);
        throw new Error(error.response?.data?.message || 'Falha ao buscar plano atual do usuário.');
    }
};

export const getUserHistory = async (userId: string): Promise<PurchaseHistory[]> => {
    try {
        const response = await axios.get<PurchaseHistory[]>(`${API_BASE_URL}/users/${userId}/history`);
        return response.data.map(item => parseDecimalFields(item));
    } catch (error: any) {
        console.error('Erro ao chamar a API GET /users/:userId/history:', error.message);
        throw new Error(error.response?.data?.message || 'Falha ao buscar histórico do usuário.');
    }
};

export const getAllPurchases = async (): Promise<PurchaseHistory[]> => {
    try {
        const response = await axios.get<PurchaseHistory[]>(`${API_BASE_URL}/purchases/management`);
        return response.data.map(item => parseDecimalFields(item));
    } catch (error: any) {
        console.error('Erro ao chamar a API GET /purchases/management:', error.message);
        throw new Error(error.response?.data?.message || 'Falha ao buscar todas as compras para gerenciamento.');
    }
};