// frontend/src/hooks/usePaymentForm.ts

import axios from 'axios';
import React, { useState } from 'react';
import { createPurchase } from '../api/apiService';
import { CreatePurchaseDTO, CreditCardDetails, Plan, PurchaseResult } from '../types';

interface UsePaymentFormProps {
  userId: string;
  planId: string;
  isMonthly: boolean;
  onSuccess: (result: PurchaseResult, plan: Plan) => void;
  onError: (message: string | null) => void;
  selectedPlan: Plan;
}

export const usePaymentForm = ({ userId, planId, isMonthly, onSuccess, onError, selectedPlan }: UsePaymentFormProps) => {
  const [cardDetails, setCardDetails] = useState<CreditCardDetails>({
    holderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails(prevDetails => ({ ...prevDetails, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    onError(null);

    const purchaseData: CreatePurchaseDTO = {
      planId: planId,
      isMonthly: isMonthly,
      cardDetails: cardDetails,
      userEmail: 'john.doe@example.com',
    };

    try {
      const result = await createPurchase(userId, purchaseData);

      if (result.status === 'success') {
        onSuccess(result, selectedPlan);
      } else {
        onError(result.message || 'Falha no pagamento. Tente novamente.');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        onError(err.message || 'Ocorreu um erro ao processar a compra. Verifique sua conexão.');
      } else if (axios.isAxiosError(err) && err.response?.data?.message) {
        onError(err.response.data.message);
      } else {
        onError('Ocorreu um erro desconhecido.');
      }
    } finally {
      setLoading(false);
    }
  };

  return { cardDetails, handleCardChange, handleSubmit, loading };
};