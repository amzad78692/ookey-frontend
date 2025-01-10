import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import ForgotPassword from '../pages/ForgotPassword'
import CategoryProduct from '../pages/CategoryProduct'
import ProductDetails from '../pages/ProductDetails'
import Cart from '../pages/Cart'
import RealEstate from '../pages/RealEstate'
import Profile from '../pages/Profile'
import Orders from '../pages/Orders'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'sign-up',
        element: <SignUp />
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword />
      },
      {
        path: 'product-category',
        element: <CategoryProduct />
      },
      {
        path: 'product/:id',
        element: <ProductDetails />
      },
      {
        path: 'cart',
        element: <Cart />
      },
      {
        path: 'real-estate',
        element: <RealEstate />
      },
      {
        path: 'profile',
        element: <Profile />
      },
      {
        path: 'orders',
        element: <Orders />
      }
    ]
  }
])

export default router