import { PlanCard } from '../AccessPlans/components/PlanCard';
import { Header } from "./components/Header";

export function AccessPlans() {
  const plans = [
    {
      title: 'Plano Light',
      annualPrice: '130,83',
      monthlyPrice: '157,00',
      features: [
        'Consulta de benefícios do INSS',
        '2 Créditos Offline',
        '20 Créditos Offline'
      ]
    },
    {
      title: 'Plano Standard',
      annualPrice: '207,91',
      monthlyPrice: '249,50',
      features: [
        'Consulta de benefícios do INSS',
        '10 Créditos Offline',
        '30 Créditos Offline'
      ],
      isPopular: true
    },
    {
      title: 'Plano Pro',
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
          <h1 className="text-2xl font-bold text-center mb-8">Planos de acesso</h1>

          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <PlanCard key={plan.title} {...plan} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
