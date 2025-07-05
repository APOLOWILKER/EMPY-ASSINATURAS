// src/pages/AccessPlans/components/PlanCard.tsx
import { PlanCardProps } from '@/pages/AccessPlans/schemas/PlanCard';

export const PlanCard = ({ 
  title, 
  annualPrice, 
  monthlyPrice, 
  features,
  isPopular = false 
}: PlanCardProps) => {
  return (
    <div className={`relative flex flex-col h-full rounded-xl border border-gray-200 bg-white p-6 shadow-sm ${isPopular ? 'ring-2 ring-[#006EB6]' : ''}`}>
      {isPopular && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#006EB6] text-white text-xs font-bold px-4 py-1 rounded-full">
          POPULAR
        </div>
      )}
      
      <div className="text-center mb-4">
        <div className="text-sm font-semibold text-[#006EB6]">Plano</div>
        <div className="text-xl font-bold text-[#006EB6]">{title}</div>
      </div>
      
      <p className="text-xs text-[#006EB6] text-center mb-6">
        Ganhe 2 meses de desconto na contratação<br />
        anual com 12 meses de fidelidade
      </p>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs text-[#006EB6]">Anual</span>
          <div className="text-right">
            <div className="text-base font-bold text-[#006EB6]">R$ {annualPrice}</div>
            <div className="text-xs text-[#006EB6]">/ mensais</div>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-xs text-[#006EB6]">Mensal</span>
          <div className="text-right">
            <div className="text-base font-bold text-[#006EB6]">R$ {monthlyPrice}</div>
            <div className="text-xs text-[#006EB6]">/ mensais</div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-[#006EB6] mb-4 opacity-30"></div>
      
      <ul className="space-y-2 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <div className="flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center mr-2 mt-0.5">
              <div className={`h-2 w-2 rounded-full ${index < 2 ? 'bg-[#7BC625]' : 'bg-[#FF4E3A]'}`}></div>
            </div>
            <span className="text-sm text-[#006EB6]">{feature}</span>
          </li>
        ))}
      </ul>
      
      <div className="mt-auto space-y-3">
        <button className="w-full bg-[#006EB6] hover:bg-[#005a9b] text-white font-medium py-2 px-4 rounded-md transition-colors text-sm">
          Assinar anual
        </button>
        <button className="w-full bg-white hover:bg-gray-50 text-[#006EB6] font-medium py-2 px-4 rounded-md border border-[#006EB6] transition-colors text-sm">
          Assinar mensal
        </button>
      </div>
    </div>
  );
};