import { useLocation, useNavigate } from 'react-router-dom';

export  function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const planId = new URLSearchParams(location.search).get('plan');

  const handlePaymentSuccess = () => {
    // Lógica de pagamento aqui
    navigate('/meu-plano', { state: { plan: planId } });
  };

  return (
    <div>
      <h1>Pagamento do Plano {planId}</h1>
      <button onClick={handlePaymentSuccess}>
        Confirmar Pagamento
      </button>
    </div>
  );
}