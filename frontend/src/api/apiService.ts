import axios from 'axios';
import { ChangePlanDTO, CreatePurchaseDTO, Plan, PurchaseHistory, PurchaseResult, Subscription } from '../types';

const API_BASE_URL = 'http://localhost:3001';

const parseDecimalFields = (obj: unknown): unknown => {
  if (obj === null || typeof obj !== 'object') return obj; 

  const newObj = { ...obj as Record<string, unknown> }; // <--- Cast para Record<string, unknown> para spread


  if (typeof newObj.monthlyValue === 'string') {
    newObj.monthlyValue = parseFloat(newObj.monthlyValue);
  }
  if (newObj.annualValue !== undefined && newObj.annualValue !== null) { // Adicionado check de undefined
    if (typeof newObj.annualValue === 'string') { // Só converte se for string
      newObj.annualValue = parseFloat(newObj.annualValue);
    }
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
    return response.data.map(plan => parseDecimalFields(plan) as Plan);
  } catch (error: unknown) {
    if (error instanceof Error) {
        console.error('Erro ao chamar a API GET /plans:', error.message);
        throw new Error(error.message); // Lança o erro original ou uma mensagem específica
    } else if (axios.isAxiosError(error) && error.response?.data?.message) {
        throw new Error(error.response.data.message);
    }
    throw new Error('Falha ao buscar planos.'); // Mensagem genérica para erros desconhecidos
  }
};

export const createPurchase = async (userId: string, purchaseData: CreatePurchaseDTO): Promise<PurchaseResult> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/${userId}/purchase`, purchaseData);
    return parseDecimalFields(response.data) as PurchaseResult;
  } catch (error: unknown) { 
    if (error instanceof Error) {
        console.error('Erro ao chamar a API POST /users/:userId/purchase:', error.message);
        throw new Error(error.message);
    } else if (axios.isAxiosError(error) && error.response?.data?.message) {
        throw new Error(error.response.data.message);
    }
    throw new Error('Falha ao processar a compra.');
  }
};

export const changePlan = async (userId: string, changeData: ChangePlanDTO): Promise<PurchaseResult> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users/${userId}/change-plan`, changeData);
      return parseDecimalFields(response.data) as PurchaseResult;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Erro ao chamar a API POST /users/:userId/change-plan:', error.message);
        throw new Error(error.message);
      } else if (axios.isAxiosError(error) && error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Falha ao alterar o plano.');
    }
};

export const getUserCurrentPlan = async (userId: string): Promise<Subscription | null> => {
    try {
        const response = await axios.get<Subscription>(`${API_BASE_URL}/users/${userId}/plan`);
        if (response.status === 404) { return null; }
        return parseDecimalFields(response.data) as Subscription;
    } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Erro ao chamar a API GET /users/:userId/plan:', error.message);
          if (axios.isAxiosError(error) && error.response?.status === 404) {
            return null; 
          }
          throw new Error(error.message);
        } else if (axios.isAxiosError(error) && error.response?.data?.message) {
          throw new Error(error.response.data.message);
        }
        throw new Error('Falha ao buscar plano atual do usuário.');
    }
};

export const getUserHistory = async (userId: string): Promise<PurchaseHistory[]> => {
    try {
        const response = await axios.get<PurchaseHistory[]>(`${API_BASE_URL}/users/${userId}/history`);
        return response.data.map(item => parseDecimalFields(item)) as PurchaseHistory[];
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Erro ao chamar a API GET /users/:userId/history:', error.message);
            throw new Error(error.message);
        } else if (axios.isAxiosError(error) && error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error('Falha ao buscar histórico do usuário.');
    }
};

export const getAllPurchases = async (): Promise<PurchaseHistory[]> => {
    try {
        const response = await axios.get<PurchaseHistory[]>(`${API_BASE_URL}/purchases/management`);
        return response.data.map(item => parseDecimalFields(item)) as PurchaseHistory[];
    } catch (error: unknown) { 
        if (error instanceof Error) {
            console.error('Erro ao chamar a API GET /purchases/management:', error.message);
            throw new Error(error.message);
        } else if (axios.isAxiosError(error) && error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error('Falha ao buscar todas as compras para gerenciamento.');
    }
};