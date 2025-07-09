import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Plan } from '../types';

interface LocationState {
  plan?: Plan;
  isMonthly?: boolean;
}

export const usePlanSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isMonthly, setIsMonthly] = useState<boolean>(true);

  useEffect(() => {
    const state = location.state as LocationState;
    if (state && state.plan) {
      setSelectedPlan(state.plan);
      setIsMonthly(state.isMonthly ?? true);
    } else {
      navigate('/', { replace: true });
    }
  }, [location.state, navigate]);

  return { selectedPlan, isMonthly };
};