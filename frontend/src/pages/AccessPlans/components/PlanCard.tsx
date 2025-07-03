import { PlanCardProps, PlanCardSchema } from '@/pages/AccessPlans/schemas/planCardSchemas';

export function PlanCard(props: PlanCardProps) {
  // Validação das props
  const validationResult = PlanCardSchema.safeParse(props);

  if (!validationResult.success) {
    console.error("Erro de validação:", validationResult.error.flatten());
    return (
      <div className="border border-red-500 p-4 rounded-lg">
        <p className="text-red-500">Erro no formato dos dados do plano</p>
      </div>
    );
  }

  const { title, annualPrice, monthlyPrice, features, isPopular } = validationResult.data;

  return (
    <div className={`border rounded-lg p-6 ${isPopular ? 'border-2 border-blue-500 shadow-lg' : 'border-gray-200'}`}>
      {isPopular && (
        <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
          POPULAR
        </div>
      )}
      
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-sm text-gray-600 mb-4">
        Ganhe 2 meses de desconto na contratação anual com 12 meses de fidelidade
      </p>

      {/* ... restante do componente ... */}
    </div>
  );
}