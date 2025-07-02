import { Route, Routes } from 'react-router-dom';
import PlanAccessPage from './pages/PlanAccessPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<PlanAccessPage />} />
      {/* Add more routes here as needed */}
      {/* <Route path="/checkout" element={<CheckoutPage />} /> */}
      {/* <Route path="/my-plan" element={<MyPlanPage />} /> */}
      {/* <Route path="/receipt" element={<ReceiptPage />} /> */}
      {/* <Route path="/admin/plans" element={<AdminPlansPage />} /> */}
    </Routes>
  );
}

export default App;
