import HomePage from '../pages/HomePage/HomePage'
import OrderPage from '../pages/OrderPage/OrderPage'
import ProductsPage from '../pages/ProductsPage/ProductsPage'
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage'
import SignInPage from '../pages/SignInPage/SignInPage'
import SignUpPage from '../pages/SignUpPage/SignUpPage'
import AdminPage from '../pages/AdminPage/AdminPage'
import PaymentOrderPage from '../pages/PaymentOrderPage/PaymentOrderPage'
import ProfilePage from '../pages/Profile/ProfilePage'
import ProductDetailsPage from '../pages/ProductDetailsPage/ProductDetailsPage'
import TypeProductPage from '../pages/TypeProductPage/TypeProductPage'
import PaymentPage from '../pages/PaymentPage/PaymentPage'
import OrderSuccess from '../pages/OrderSuccess/OrderSuccess'
export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true,

    },
    {
        path: '/order',
        page: OrderPage,
        isShowHeader: true,

    },
    {
        path: '/payment',
        page: PaymentPage,
        isShowHeader: true,

    },
    {
        path: '/orderSuccess',
        page: OrderSuccess,
        isShowHeader: true,

    },

    {
        path: '/product',
        page: ProductsPage,
        isShowHeader: true,

    },
    {
        path: '/product/:type',
        page: TypeProductPage,
        isShowHeader: true,

    },
    {
        path: '/sign-in',
        page: SignInPage,
        isShowHeader: false,

    },
    {
        path: '/sign-up',
        page: SignUpPage,
        isShowHeader: false,

    },
    {
        path: '/product-details/:id',
        page: ProductDetailsPage,
        isShowHeader: true,

    },
    {
        path: '/profile-user',
        page: ProfilePage,
        isShowHeader: true,

    },
    {
        path: '/payment-order',
        page: PaymentOrderPage,
        isShowHeader: true,

    },
    {
        path: '/system/admin',
        page: AdminPage,
        isShowHeader: false,
        isPrivate: true,
    },
    {
        path: '*',
        page: NotFoundPage
    }
]