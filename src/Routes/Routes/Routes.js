import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main";
import Profile from "../../Others/Profile/Profile";
import Category from "../../Pages/Category/Category";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login/Login";
import Register from "../../Pages/Login/Register/Register";
import News from "../../Pages/News/News";
import TermsAndConditions from "../../Pages/Shared/TermsAndConditions/TermsAndConditions";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
                loader: () => fetch('http://localhost:5000/news')
            },
            {
                path: '/category/:id',
                element: <Category></Category>,
                loader: ({ params }) => fetch(`http://localhost:5000/category/${params.id}`)

            },
            {
                path: '/news/:id',
                element: <PrivateRoutes><News></News></PrivateRoutes>,
                loader: ({ params }) => fetch(`http://localhost:5000/news/${params.id}`)

            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/terms', element: <TermsAndConditions></TermsAndConditions>
            },
            {
                path: '/profile', element: <PrivateRoutes><Profile></Profile></PrivateRoutes>
            }
        ]
    }
])