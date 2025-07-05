// src/pages/AccessPlans/components/Header.tsx
import headerAccessPlan from '@/assets/HeaderAccessPlan.svg';
import logoHorizontal from '@/assets/logoHorizontal.svg';

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <button className=" text-gray-700 font-semibold py-2  px-4 rounded-full border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-opacity-75 transition-colors">
          voltar
        </button>
        <img 
          src={logoHorizontal} 
          alt="Logo"
          className="h-8"
        />
        <div className="w-6"></div>
      </div>
      <img 
        src={headerAccessPlan} 
        alt="Header"
        className="w-full h-auto"
      />
    </header>
  );
}