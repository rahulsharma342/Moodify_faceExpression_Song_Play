// import {createBrowserRouter} from "react-router-dom";
// import Splash from "./features/auth/pages/Splash";
// import Login from "./features/auth/pages/Login";
// import Register from "./features/auth/pages/Register";
// import Home from "./home/pages/Home";
// import Protected from "./features/auth/components/Protected";


// const router = createBrowserRouter([
//     {
//         path: "/",
//         element:<Splash />
//     },
//     {
//         path:"/home",
//         element:<Protected><Home /></Protected>
//     },
//     {
//         path:"/login",
//         element:<Login />
//     },
//     {
//         path:"/register",
//         element:<Register />
//     }
// ]);

// export default router;
import { createBrowserRouter } from "react-router-dom";
import Splash from "./features/auth/pages/Splash";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Home from "./home/pages/Home";
import Playlist from "./home/pages/Playlist";
import Protected from "./features/auth/components/Protected";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Splash />,
  },
  {
    path: "/home",
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
  },
  {
    path: "/playlist",
    element: (
      <Protected>
        <Playlist />
      </Protected>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;