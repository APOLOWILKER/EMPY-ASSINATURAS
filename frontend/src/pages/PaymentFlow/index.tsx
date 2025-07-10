import { useState } from 'react';
import { IoAlertCircleOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { usePaymentForm } from '../../hooks/usePaymentForm';
import { usePlanSelection } from '../../hooks/usePlanSelection';
import { Plan, PurchaseResult } from '../../types';
import SimpleHeader from './components/SimpleHeader';

const PaymentFlowPage = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const userId = 'a1b2c3d4-e5f6-7890-1234-567890abcdef';

  const { selectedPlan, isMonthly } = usePlanSelection();

  const handlePaymentSuccess = (result: PurchaseResult, plan: Plan) => {
    setErrorMessage(null);
    setSuccessMessage(result.message);
    navigate('/receipt', { state: { result, plan } });
  };

  const handlePaymentError = (message: string | null) => {
    setErrorMessage(message);
    setSuccessMessage(null);
  };

  const { cardDetails, handleCardChange, handleSubmit, loading } = usePaymentForm({
    userId: userId,
    planId: selectedPlan?.id || '',
    isMonthly: isMonthly,
    onSuccess: handlePaymentSuccess,
    onError: handlePaymentError,
    selectedPlan: selectedPlan!,
  });

  if (!selectedPlan) { return <div className="text-center p-5">Carregando detalhes do plano...</div>; }

  return (
    <div className="min-h-screen bg-gray-100 font-sans flex flex-col">
      <SimpleHeader />

      {errorMessage && (
        <div className="absolute top-4 right-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded shadow-md flex items-center space-x-2 z-50 max-w-xs">
          <IoAlertCircleOutline className="text-yellow-600 text-xl" />
          <p className="font-bold">Atenção!</p>
          <p>{errorMessage}</p>
        </div>
      )}

      <div className="flex justify-center items-center flex-grow py-6">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Checkout - {selectedPlan.name}</h1>
          <p className="text-center text-lg text-gray-600 mb-4">Modalidade: {isMonthly ? 'Mensal' : 'Anual'}</p>
          <p className="text-center text-3xl font-bold text-blue-600 mb-8">Valor: R$ {isMonthly ? selectedPlan.monthlyValue?.toFixed(2) : selectedPlan.annualValue?.toFixed(2)}</p>

          <div className="flex justify-center mb-6">
              <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">1</span>
                  <span className="text-gray-700 font-semibold">Cadastro</span>
                  <span className="flex-1 border-b border-gray-400 mx-2"></span>
                  <span className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">2</span>
                  <span className="text-gray-700 font-semibold">Pagamento</span>
              </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="mb-4">
              <label htmlFor="holderName" className="block text-gray-700 text-sm font-bold mb-2">Nome do Titular:</label>
              <input type="text" id="holderName" name="holderName" value={cardDetails.holderName} onChange={handleCardChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" autoComplete="cc-name" />
            </div>

            <div className="mb-4">
              <label htmlFor="cardNumber" className="block text-gray-700 text-sm font-bold mb-2">Número do Cartão (16 dígitos):</label>
              <input type="text" id="cardNumber" name="cardNumber" value={cardDetails.cardNumber} onChange={handleCardChange} maxLength={16} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" autoComplete="cc-number" />
            </div>

            <div className="flex space-x-4 mb-6">
              <div className="w-1/2">
                <label htmlFor="expiryDate" className="block text-gray-700 text-sm font-bold mb-2">Validade (MM/AA):</label>
                <input type="text" id="expiryDate" name="expiryDate" value={cardDetails.expiryDate} onChange={handleCardChange} placeholder="MM/YY" maxLength={5} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" autoComplete="cc-exp" />
              </div>
              <div className="w-1/2">
                <label htmlFor="cvv" className="block text-gray-700 text-sm font-bold mb-2">CVV (3 dígitos):</label>
                <input type="text" id="cvv" name="cvv" value={cardDetails.cvv} onChange={handleCardChange} maxLength={3} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" autoComplete="cc-csc" />
              </div>
            </div>

            <button type="submit" disabled={loading} className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
              {loading ? 'Processando...' : 'Continuar'}
            </button>
          </form>

          {successMessage && <p className="text-green-500 text-center mt-4">{successMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default PaymentFlowPage;