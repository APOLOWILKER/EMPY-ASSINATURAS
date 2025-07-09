import headerAccessPlan from '@/assets/HeaderAccessPlan.svg';
import logoHorizontal from '@/assets/logoHorizontal.svg';

export function Header() {
  return (
    <header className="mt-4 bg-white">
        <div className="flex items-center justify-normal">
        <button className=" text-gray-700 font-semibold py-2 ml-2 px-6 rounded-full border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-opacity-75 transition-colors">
          voltar
        </button>
        <img 
          src={logoHorizontal} 
          alt="Logo"
          className="ml-60 h-10 md:h-12 lg:h-14 xl:h-16 2xl:h-20"
        />
        </div>
      <img 
        src={headerAccessPlan} 
        alt="Header"
        className="w-full h-auto object-cover mt-4 md:mt-6 lg:mt-8 xl:mt-10 2xl:mt-12"
      />
    </header>
  );
}