import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import Main from '../Layout/Main'
import Login from "../Pages/Login/Login";
import SignUP from "../Pages/Login/SignUP";
import TourList from "../Pages/Home/Tourists/TourList";
import AllPakages from "../Pages/Home/AllPakages/AllPakages";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home></Home>,

      },
      {
        path: '/touristList',
        element: <TourList></TourList>        
      },
      {
        path: '/allPakages',
        element: <AllPakages></AllPakages>        
      },
      {
        path:'/login',
        element: <Login></Login>
      },
      {
        path:'/signUp',
        element: <SignUP></SignUP>
      }

    ]
  },


]);