import { AccessPlans } from '@/pages/AccessPlans'
import { createBrowserRouter } from 'react-router-dom'
import { App } from '../App'
import { MyPlan } from '../pages/MyPlan'
import { Payment } from "../pages/PaymentFlow"

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <AccessPlans />,
      },
      {
        path: 'pagamento',
        element: <Payment />,
      },
      {
        path: 'meu-plano',
        element: <MyPlan />,
      }
    ]
  }
])