import SizeLogoEmpy from "@/assets/SizeLogoEmpy.svg";
import { useNavigate } from "react-router";
import { Plan } from "types/plan";
import { usePlans } from "../../hooks/usePlans";
import PlanCard from "./components/Card";
import { Header } from "./components/Header";

const AccessPlansPage = () => {
  const { plans, loading, error, refetch } = usePlans();

  const navigate = useNavigate();

  if (loading) {
    return <p className="text-center mt-8">Carregando planos...</p>;
  }

  const handleSubscribe = (plan: Plan, isMonthly: boolean) => {
    navigate('/checkout', { state: { plan, isMonthly } }); 
  };

  if (error) {
    return (
      <div className="text-center mt-8">
        <p className="text-red-600">Erro ao carregar planos: {error}</p>
        <button onClick={refetch} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Tentar Novamente
        </button>
      </div>
    );
  }

  if (!plans || plans.length === 0) {
    return <p className="text-center mt-8">Nenhum plano encontrado.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <img
          src={SizeLogoEmpy}
          alt="Logo"
          className="mx-auto mt-5 mb-8"
        />
        <h1 className="text-3xl font-bold text-gray-800 text-left mb-8">Planos de Acesso</h1>

        <div className="flex flex-wrap justify-center gap-4">
          {plans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              onSubscribe={handleSubscribe}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccessPlansPage;