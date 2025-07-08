// frontend/src/pages/AccessPlans/index.tsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPlans, Plan } from '../../api/apiService'; // Importa getPlans e a interface Plan

const AccessPlansPage = () => { // Removido React.FC e tipagem direta das props
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const data = await getPlans();
        setPlans(data);
      } catch (err: unknown) { // Tratamento de erro corrigido
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Ocorreu um erro desconhecido ao carregar os planos.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  const handleSubscribe = (plan: Plan, isMonthly: boolean) => {
    navigate('/checkout', { state: { plan, isMonthly } });
  };

  if (loading) { return <div style={{ textAlign: 'center', padding: '20px' }}>Carregando planos...</div>; }
  if (error) { return <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>Erro: {error}</div>; }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>Nossos Planos de Assinatura</h1>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
        {plans.map((plan) => (
          <div key={plan.id} style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '10px', width: '320px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', backgroundColor: 'white' }}>
            <h2 style={{ fontSize: '1.8em', marginBottom: '10px', color: '#007bff', textAlign: 'center' }}>{plan.name}</h2>
            {plan.description && <p style={{ fontSize: '0.9em', color: '#555', minHeight: '40px' }}>{plan.description}</p>}
            
            <div style={{ border: '1px dashed #007bff', padding: '10px', margin: '15px 0', borderRadius: '5px', textAlign: 'center' }}>
              {/* Lógica para "Ganhe 2 meses de desconto..." */}
              {plan.monthlyValue !== null && plan.annualValue !== null &&
               ((plan.monthlyValue * 12 - plan.annualValue * 12) / (plan.monthlyValue * 12) >= 0.16 && // Aproximadamente 1/6
                (plan.monthlyValue * 12 - plan.annualValue * 12) / (plan.monthlyValue * 12) <= 0.17)
              ? <p style={{ color: '#007bff', fontWeight: 'bold', fontSize: '1.1em' }}>Ganhe 2 meses de desconto na contratação anual com 12 meses de fidelidade!</p>
              : null}
              
              {plan.annualValue !== null && (
                <p style={{ fontSize: '1.5em', fontWeight: 'bold', color: '#333' }}>Anual R$ {plan.annualValue.toFixed(2)} / mês</p>
              )}
              {plan.monthlyValue !== null && (
                <p style={{ fontSize: '1.1em', color: '#777' }}>Mensal R$ {plan.monthlyValue.toFixed(2)} / mês</p>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
              <p style={{ color: '#4CAF50', fontWeight: 'bold' }}>• Consulta de benefícios do INSS</p>
              <p style={{ color: '#FF9800', fontWeight: 'bold' }}>• {plan.onlineCredits} Créditos Online</p>
              <p style={{ color: '#F44336', fontWeight: 'bold' }}>• Créditos Offline: {plan.offlineCredits === -1 ? 'Ilimitados' : plan.offlineCredits}</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '30px' }}>
              {plan.annualValue !== null && (
                  <button 
                    onClick={() => handleSubscribe(plan, false)} 
                    style={primaryButtonStyle}
                  >
                    Assinar anual
                  </button>
              )}
              {plan.monthlyValue !== null && (
                  <button 
                    onClick={() => handleSubscribe(plan, true)} 
                    style={secondaryButtonStyle}
                  >
                    Assinar mensal
                  </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const primaryButtonStyle: React.CSSProperties = {
  padding: '12px 20px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '1em',
  fontWeight: 'bold',
  width: '100%',
  boxSizing: 'border-box',
};

const secondaryButtonStyle: React.CSSProperties = {
  ...primaryButtonStyle,
  backgroundColor: '#6c757d', // Cinza para o botão secundário
};

export default AccessPlansPage;