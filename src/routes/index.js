import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Login from '../pages/Login'
import ForgotPassowrd from '../pages/ForgotPassowrd'
import SignUp from '../pages/SignUp'
import CategoryProduct from '../pages/CategoryProduct'
import ProductDetails from '../pages/ProductDetails'
import Cart from '../pages/Cart'
import SearchProduct from '../pages/SearchProduct'
import Success from '../pages/Success'
import Cancel from '../pages/Cancel'
import OrderPage from '../pages/OrderPage'
import DashboardLayout from '../components/admin/DashboardLayout'
import Overview from '../pages/admin/Overview'
import AuthGuard from '../components/admin/AuthGuard'
import ProductManagement from '../pages/admin/ProductManagement'
import RealEstateManagement from '../pages/admin/RealEstateManagement'
import UserManagement from '../pages/admin/UserManagement'
import Reports from '../pages/admin/Reports'
import OrderManagement from '../pages/admin/OrderManagement'

const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            {
                path : "",
                element : <Home/>
            },
            {
                path : "login",
                element : <Login/>
            },
            {
                path : "forgot-password",
                element : <ForgotPassowrd/>
            },
            {
                path : "sign-up",
                element : <SignUp/>
            },
            {
                path : "product-category",
                element : <CategoryProduct/>
            },
            {
                path : "product/:id",
                element : <ProductDetails/>
            },
            {
                path : 'cart',
                element : <Cart/>
            },
            {
                path:"success",
                element:<Success/>
            },
            {
                path:"cancel",
                element:<Cancel/>
            },
            {
                path:"order",
                element:<OrderPage/>
            },
            {
                path : "search",
                element : <SearchProduct/>
            },
            {
                path : "admin-panel",
                element : <AuthGuard><DashboardLayout/></AuthGuard>,
                children : [
                    {
                        path : "",
                        element : <Overview/>
                    },
                    {
                        path : "users",
                        element : <UserManagement/>
                    },
                    {
                        path : "products",
                        element : <ProductManagement/>
                    },
                    {
                        path : "real-estate",
                        element : <RealEstateManagement/>
                    },
                    {
                        path : "orders",
                        element : <OrderManagement/>
                    },
                    {
                        path : "reports",
                        element : <Reports/>
                    }
                ]
            },
        ]
    }
])

export default router