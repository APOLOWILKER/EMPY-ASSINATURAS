import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Plan, PurchaseResult } from '../types';

interface LocationState {
  result: PurchaseResult;
  plan: Plan;
}

/**
 * @function useReceiptData
 * @description Hook customizado para extrair e gerenciar os dados do comprovante da location.state.
 * Redireciona para a home se os dados não estiverem presentes.
 * @returns {{result: PurchaseResult | null, plan: Plan | null}} Objeto com os dados do comprovante e do plano.
 */
export const useReceiptData = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [result, setResult] = useState<PurchaseResult | null>(null);
  const [plan, setPlan] = useState<Plan | null>(null);

  useEffect(() => {
    const state = location.state as LocationState;

    if (state && state.result && state.plan) {
      setResult(state.result);
      setPlan(state.plan);
    } else {
      
      navigate('/', { replace: true });
    }
  }, [location.state, navigate]);

  return { result, plan };
};