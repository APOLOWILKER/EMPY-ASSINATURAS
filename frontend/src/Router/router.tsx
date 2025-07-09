import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';


import AccessPlansPage from '../pages/AccessPlans';


import App from '../App';

const AppRouter = () => {
  return (
    <Router>
      <App>
        <Routes>
          <Route path="/" element={<AccessPlansPage />} />
        </Routes>
      </App>
    </Router>
  );
};

export default AppRouter;