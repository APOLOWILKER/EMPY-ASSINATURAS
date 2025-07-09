import logoHorizontal from '@/assets/logoHorizontal.svg';
import { useNavigate } from 'react-router-dom';

const SimpleHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center px-4 py-2 text-gray-700 font-semibold rounded-full border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-opacity-75 transition-colors"
      >
        Voltar
      </button>
      <div className="flex-grow flex justify-center">
        <img src={logoHorizontal} alt="Empy Logo" className="h-8" />
      </div>
      <div className="w-20"></div>
    </header>
  );
};

export default SimpleHeader;