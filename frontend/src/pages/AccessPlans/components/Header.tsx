export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <button className="text-gray-600 hover:text-gray-900">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <img 
          src="/assets/logoHorizontal.svg" 
          alt="Logo"
          className="h-8"
        />
        <div className="w-6"></div> {/* Espaço vazio para alinhamento */}
      </div>
      <img 
        src="/assets/HeaderAccessPlan.svg" 
        alt="Header"
        className="w-full h-auto"
      />
    </header>
  );
}