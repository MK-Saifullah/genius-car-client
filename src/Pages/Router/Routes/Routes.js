import { createBrowserRouter } from "react-router-dom";
import Main from "../../../Layout/Main";
import Checkout from "../../Checkout/Checkout";
import Home from "../../Home/Home/Home";
import Login from "../../Login/Login/Login";
import Signup from "../../Login/Signup/Signup";
import Orders from "../../Orders/Orders";
import PrivateRoute from "../PrivateRoute/PrivateRoute";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <Signup></Signup>
            },
            {
                path: '/checkout/:id',
                element: <PrivateRoute><Checkout></Checkout></PrivateRoute>,
                loader: ({params})=> fetch(`https://genius-car-server-mk-saifullah.vercel.app/services/${params.id}`)
            },
            {
                path: '/orders',
                element: <PrivateRoute><Orders></Orders></PrivateRoute>,
                // element: <Orders></Orders>,
                // loader: ({params})=> fetch(`https://genius-car-server-mk-saifullah.vercel.app/orders/${params.id}`)
            }
        ]
    }
])

export default router;