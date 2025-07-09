import PolygonGreen from "../../../assets/PolygonGreen.svg";
import PolygonRed from "../../../assets/PolygonRed.svg";
import { PlanCardProps } from '../schemas/planCardSchemas';


const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-100 mr-2" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1  0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

const PlanCard = ({ plan, onSubscribe }: PlanCardProps) => {

  return (
    <div className="bg-white shadow-xl rounded-lg p-6 mb-4 w-80 flex-shrink-0">
      <p className="text-gray-700 text-lg mb-2">Plano</p>
      <h2 className="text-4xl font-bold text-gray-800 mb-6">{plan.name}</h2>

      {plan.annualValue !== null && plan.annualValue !== undefined && (
        <div className="border-2 border-dashed border-blue-400 rounded-lg p-4 mb-6 text-center">
          <p className="text-blue-700 font-semibold text-sm mb-2">
            Ganhe 2 meses de desconto na contratação anual com 12 meses de fidelidade
          </p>
          <div className="flex items-baseline justify-center">
            <span className="font-bold text-gray-700 mr-1">Anual R$</span>
            <span className="text-4xl font-bold text-blue-800">{plan.annualValue.toFixed(2).replace('.', ',')}</span>
            <span className="font-bold text-gray-700 ml-1">/ mensais</span>
          </div>
        </div>
      )}

      {plan.monthlyValue !== null && plan.monthlyValue !== undefined && (
        <div className="text-center mb-6">
          <div className="flex items-baseline justify-center">
            <span className="text-xl font-bold text-gray-700 mr-1">Mensal R$</span>
            <span className="text-4xl font-bold text-gray-800">{plan.monthlyValue.toFixed(2).replace('.', ',')}</span>
            <span className="text-xl font-bold text-gray-700 ml-1">/ mensais</span>
          </div>
        </div>
      )}

      <div className="bg-blue-700 text-white rounded-lg p-6 mb-6">
        <div className="flex items-center mb-3">
          <CheckCircleIcon />
          <p className="font-semibold">Consulta de benefícios do INSS</p>
        </div>

        <div className="flex flex-col gap-2 mt-4 w-full">
          {plan.onlineCredits > 0 && (
            <div className="flex items-center mb-2">
              <div className="w-4 h-4 rounded-full bg-green-500 flex justify-center items-center mr-2 overflow-hidden">
                <img src={PolygonGreen} alt="Crédito Online" className="w-full h-full object-cover" />
              </div>
              <p className="text-base">
                {plan.onlineCredits} Créditos Online
              </p>
            </div>
          )}
          {plan.offlineCredits !== 0 && plan.offlineCredits !== null && plan.offlineCredits !== -1 && (
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-red-500 flex justify-center items-center mr-2 overflow-hidden">
                <img src={PolygonRed} alt="Crédito Offline" className="w-full h-full object-cover" />
              </div>
              <p className="text-base">
                {plan.offlineCredits} Créditos Offline
              </p>
            </div>
          )}
          {plan.offlineCredits === -1 && (
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-red-500 flex justify-center items-center mr-2 overflow-hidden">
                <img src={PolygonRed} alt="Crédito Offline" className="w-full h-full object-cover" />
              </div>
              <p className="text-base">
                Créditos Offline ILIMITADOS
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {plan.annualValue !== null && plan.annualValue !== undefined && (
          <button 
            onClick={() => onSubscribe(plan, false)} 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-full w-full transition-colors duration-200"
          >
            Assinar anual
          </button>
        )}
        {plan.monthlyValue !== null && plan.monthlyValue !== undefined && (
          <button 
            onClick={() => onSubscribe(plan, true)} 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-full w-full transition-colors duration-200"
          >
            Assinar mensal
          </button>
        )}
      </div>
    </div>
  );
};

export default PlanCard;