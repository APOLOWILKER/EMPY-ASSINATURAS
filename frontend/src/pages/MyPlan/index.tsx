import { useLocation } from 'react-router-dom';

export function MyPlan() {
  const location = useLocation();
  const { plan } = location.state || {};

  return (
    <div>
      <h1>Meu Plano Atual</h1>
      <p>Plano contratado: {plan || 'Nenhum plano selecionado'}</p>
    </div>
  );
}