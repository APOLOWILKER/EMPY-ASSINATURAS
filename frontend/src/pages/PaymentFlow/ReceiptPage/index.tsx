import { useNavigate } from 'react-router-dom';
import logoEmpy from '../../../assets/logoEmpy.svg';
import { useReceiptData } from '../../../hooks/useReceiptData';

const ReceiptPage = () => {
  const navigate = useNavigate();
  const { result, plan } = useReceiptData();

  if (!result || !plan) {
    return <div className="text-center p-5">Carregando comprovante ou redirecionando...</div>;
  }

  const isSuccess = result.status === 'success';

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex justify-center items-start">
      <div className="bg-white shadow-md rounded-lg overflow-hidden max-w-md w-full">
        <div className="bg-indigo-700 text-white p-6 flex items-center justify-center">
          <img src={logoEmpy} alt="Logo Empy" className="h-8 mr-3" />
          <h2 className="text-xl font-semibold">Comprovante Empy</h2>
        </div>
        <div className="p-6">
          {isSuccess ? (
            <>
              <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
                <p className="font-bold">Pagamento via Cartão</p>
                <p>Seu pagamento foi aprovado com sucesso!</p>
              </div>
              <div className="mb-4 text-left">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Detalhes do Plano:</h3>
                <p className="text-gray-600"><strong>Plano:</strong> {plan.name}</p>
                {result.purchaseHistory?.paidValue !== undefined && result.purchaseHistory.paidValue !== null && (
                  <p className="text-gray-600"><strong>Valor:</strong> R$ {result.purchaseHistory.paidValue.toFixed(2)}</p>
                )}
              </div>
              <div className="mb-4 text-left">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Informações de Pagamento:</h3>
                <p className="text-gray-600"><strong>Status:</strong> {result.purchaseHistory?.paymentStatus}</p>
                {isSuccess && result.subscription?.paymentMethod && (
                  <p className="text-gray-600"><strong>Método:</strong> {result.subscription.paymentMethod}</p>
                )}
                {result.purchaseHistory?.transactionDate && (
                  <p className="text-gray-600"><strong>Data:</strong> {new Date(result.purchaseHistory.transactionDate).toLocaleDateString()}</p>
                )}
              </div>
            </>
          ) : (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
              <p className="font-bold">Pagamento via Cartão</p>
              <p>Seu pagamento foi recusado.</p>
              {result.message && <p className="mt-2">{result.message}</p>}
            </div>
          )}
          <button
            onClick={() => navigate('/my-plan')} 
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Ir para meu plano
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptPage;