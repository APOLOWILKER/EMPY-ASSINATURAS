// src/pages/AccessPlans/index.tsx
import { FaWhatsapp } from 'react-icons/fa';
import { Header } from "./components/Header";
import { PlanCard } from './components/PlanCard';

export function AccessPlans() {
  const plans = [
    {
      title: 'Light',
      annualPrice: '130,83',
      monthlyPrice: '157,00',
      features: [
        'Consulta de benefícios do INSS',
        '2 Créditos Offline',
        '20 Créditos Offline'
      ]
    },
    {
      title: 'Standard',
      annualPrice: '207,91',
      monthlyPrice: '249,50',
      features: [
        'Consulta de benefícios do INSS',
        '10 Créditos Offline',
        '30 Créditos Offline'
      ]
    },
    {
      title: 'Pro',
      annualPrice: '289,92',
      monthlyPrice: '347,00',
      features: [
        'Consulta de benefícios do INSS',
        '30 Créditos Offline',
        'Créditos Offline ILIMITADOS'
      ]
    }
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-center mb-8 text-[#1E40AF]">Planos de acesso</h1>

          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <div key={plan.title} className="h-full">
                <PlanCard {...plan} />
              </div>
            ))}
          </div>
          
          {/* Botão alinhado à esquerda */}
          <div className="mt-12 flex justify-start">
            <button className="flex items-center gap-3 bg-[#5E17F5] hover:bg-[#5E17A0] text-white font-medium py-3 px-6 rounded-lg shadow-md transition-colors">
              <FaWhatsapp className="text-xl" />
              <span className="text-lg">Tire suas dúvidas</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}