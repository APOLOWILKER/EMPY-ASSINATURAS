import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';


import AccessPlansPage from '../pages/AccessPlans';


import App from '../App';
import PaymentFlowPage from "../pages/PaymentFlow";
import ReceiptPage from "../pages/PaymentFlow/ReceiptPage";

const AppRouter = () => {
  return (
    <Router>
      <App>
        <Routes>
          <Route path="/" element={<AccessPlansPage />} />
          <Route path="/checkout" element={<PaymentFlowPage />} />
          <Route path="/receipt" element={<ReceiptPage />} />
        </Routes>
      </App>
    </Router>
  );
};

export default AppRouter;