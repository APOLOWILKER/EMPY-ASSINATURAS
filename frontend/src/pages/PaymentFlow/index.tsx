// frontend/src/pages/PaymentFlow/index.tsx

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createPurchase, CreatePurchaseDTO, CreditCardDetails, Plan } from '../../api/apiService'; // Caminho ajustado

const PaymentFlowPage = () => { // Removido React.FC
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isMonthly, setIsMonthly] = useState<boolean>(true);
  const [cardDetails, setCardDetails] = useState<CreditCardDetails>({
    holderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const userId = 'a1b2c3d4-e5f6-7890-1234-567890abcdef'; // ID fixo do usuário de teste

  useEffect(() => {
    if (location.state && location.state.plan) {
      setSelectedPlan(location.state.plan);
      setIsMonthly(location.state.isMonthly ?? true);
    } else {
      navigate('/'); // Redireciona de volta para a página de planos se não houver plano selecionado
    }
  }, [location.state, navigate]);

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails(prevDetails => ({ ...prevDetails, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) return;

    setLoading(true);
    setError(null);
    setMessage(null);

    const purchaseData: CreatePurchaseDTO = {
      planId: selectedPlan.id,
      isMonthly: isMonthly,
      cardDetails: cardDetails,
      userEmail: 'john.doe@example.com', // Opcional, do usuário de teste
    };

    try {
      const result = await createPurchase(userId, purchaseData);
      setMessage(result.message);

      if (result.status === 'success') {
        navigate('/receipt', { state: { result, plan: selectedPlan } });
      } else {
        setError(result.message || 'Falha no pagamento. Tente novamente.');
      }
    } catch (err: any) { // Erro any aqui, pode ser refinado como fizemos no PlansPage
      setError(err.message || 'Ocorreu um erro ao processar a compra. Verifique sua conexão.');
    } finally {
      setLoading(false);
    }
  };

  if (!selectedPlan) { return <div style={{ textAlign: 'center', padding: '20px' }}>Carregando detalhes do plano...</div>; }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: 'auto', border: '1px solid #eee', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', backgroundColor: 'white' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Checkout - {selectedPlan.name}</h1>
      <p style={{ textAlign: 'center', color: '#555' }}>Modalidade: {isMonthly ? 'Mensal' : 'Anual'}</p>
      <p style={{ textAlign: 'center', fontSize: '1.5em', fontWeight: 'bold', color: '#007bff' }}>Valor: R$ {isMonthly ? selectedPlan.monthlyValue?.toFixed(2) : selectedPlan.annualValue?.toFixed(2)}</p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <label style={labelStyle}>Nome do Titular:</label>
        <input type="text" name="holderName" value={cardDetails.holderName} onChange={handleCardChange} required style={inputStyle} />
        <label style={labelStyle}>Número do Cartão (16 dígitos):</label>
        <input type="text" name="cardNumber" value={cardDetails.cardNumber} onChange={handleCardChange} maxLength={16} required style={inputStyle} />
        <label style={labelStyle}>Validade (MM/AA):</label>
        <input type="text" name="expiryDate" value={cardDetails.expiryDate} onChange={handleCardChange} placeholder="MM/YY" maxLength={5} required style={inputStyle} />
        <label style={labelStyle}>CVV (3 dígitos):</label>
        <input type="text" name="cvv" value={cardDetails.cvv} onChange={handleCardChange} maxLength={3} required style={inputStyle} />

        <button type="submit" disabled={loading} style={submitButtonStyle}>
          {loading ? 'Processando...' : 'Pagar Agora'}
        </button>
      </form>

      {message && <p style={{ color: 'green', marginTop: '10px', textAlign: 'center' }}>{message}</p>}
      {error && <p style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>{error}</p>}
    </div>
  );
};

const labelStyle: React.CSSProperties = {
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#555',
    display: 'block'
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px',
  marginTop: '5px',
  border: '1px solid #ddd',
  borderRadius: '5px',
  boxSizing: 'border-box',
  fontSize: '1em'
};

const submitButtonStyle: React.CSSProperties = {
  padding: '12px 25px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '1.1em',
  fontWeight: 'bold',
  marginTop: '20px',
  boxSizing: 'border-box',
};

export default PaymentFlowPage;