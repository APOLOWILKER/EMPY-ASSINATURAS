import { Outlet } from 'react-router-dom';

export function App() {
  return (
    <div className="app-container">
      {/* Outlet renderizará as páginas filhas */}
      <Outlet />
    </div>
  );
}