import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import ForgotPassword from '../pages/ForgotPassword'
import ResetPassword from '../pages/ResetPassword'
import CategoryProduct from '../pages/CategoryProduct'
import ProductDetails from '../pages/ProductDetails'
import Cart from '../pages/CartPage'
import RealEstate from '../pages/RealEstate'
import Profile from '../pages/Profile'
import Orders from '../pages/Orders'
import ProductCategory from '../pages/ProductCategory'
import CategoryPage from '../pages/CategoryPage'
import FavoritesPage from '../pages/FavoritesPage'
import AdminPanel from '../pages/AdminPanel'
import AllUsers from '../pages/admin/AllUsers'
import AllProducts from '../pages/admin/AllProducts'
import AllOrders from '../pages/admin/AllOrders'
import DashboardLayout from '../components/admin/DashboardLayout'
import DelieverySignUp from '../pages/DelieverySignUp'
import Overview from '../pages/admin/Overview'
import ProductManagement from '../pages/admin/ProductManagement'
import RealEstateManagement from '../pages/admin/RealEstateManagement'
import UserManagement from '../pages/admin/UserManagement'
import OrderManagement from '../pages/admin/OrderManagement'
import Reports from '../pages/admin/Reports'
import ContactUs from '../pages/ContactUs'
import CategoryManagement from '../pages/admin/CategoryManagement'
import SubcategoryPage from '../components/SubcategoryPage'
import LocationMessage from '../components/LocationMessage'

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
        path: 'not-serving',
        element: <LocationMessage />
      },
      {
        path: 'sign-up',
        element: <SignUp />
      },
      {
        path: 'delivery-partner',
        element: <DelieverySignUp/>
      },
      {
        path: 'admin',
        element: <DashboardLayout />,
        children: [
          {
            path: '',
            element: <Overview />
          },
          {
            path: 'category',
            element: <CategoryManagement />
          },
          {
            path: 'sub-category',
            element: <SubcategoryPage />
          },
          {
            path: 'products',
            element: <ProductManagement />
          },
          {
            path: 'real-estate',
            element: <RealEstateManagement />
          },
          {
            path: 'users',
            element: <UserManagement />
          },
          {
            path: 'orders',
            element: <OrderManagement />
          },
          {
            path: 'reports',
            element: <Reports />
          },
        ]
      },
      {
        path: 'favorites',
        element: <FavoritesPage />
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword />
      },
      {
        path: '/change-password/:token',
        element: <ResetPassword />
      },
      {
        path: 'category/:id',
        element: <CategoryPage />
      },
      {
        path: 'product/:id',
        element: <ProductDetails />
      },
      {
        path: 'product-category',
        element: <ProductCategory />
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
      },
      {
        path: 'contact-us',
        element: <ContactUs />
      },
    ]
  }
])

export default router