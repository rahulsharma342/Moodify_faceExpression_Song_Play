import {createBrowserRouter} from "react-router-dom";
import Splash from "./features/auth/pages/Splash";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import FaceExpressionDetector from "./features/Expression/components/FaceExpression";
import Protected from "./features/auth/components/Protected";


const router = createBrowserRouter([
    {
        path: "/",
        element:<Splash />
    },
    {
        path:"/home",
        element:<Protected><FaceExpressionDetector /></Protected>
    },
    {
        path:"/login",
        element:<Login />
    },
    {
        path:"/register",
        element:<Register />
    }
]);

export default router;