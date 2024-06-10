import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import Main from '../Layout/Main';
import Login from "../Pages/Login/Login";
import SignUP from "../Pages/Login/SignUP";
import TourList from "../Pages/Home/Tourists/TourList";
import AllPakages from "../Pages/Home/AllPakages/AllPakages";
import TourDetails from "../Pages/Home/Tourists/TourDetails/TourDetails";
import PriviteRoutes from "./PriviteRoutes/PriviteRoutes";
import Dashboard from "../Layout/Dashboard";
import ManageUser from "../Pages/Dashboard/Admin/ManageUser";
import MyWishList from '../Pages/Dashboard/UserPage/MyWishList';
import MyBooking from '../Pages/Dashboard/UserPage/MyBooking';
import AddPakage from '../Pages/Dashboard/Admin/AddPakage';
import AdminProfile from "../Pages/Dashboard/Admin/AdminProfile";
import MyAssigned from "../Pages/Dashboard/Guide/MyAssigned";
import UserProfile from "../Pages/Dashboard/UserPage/UserProfile";
import GuideDetails from "../Pages/Dashboard/Guide/GuideDetails";
import GuideProfile from "../Pages/Dashboard/Guide/GuideProfile"
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/touristList',
        element: <TourList />,
      },
      {
        path: '/tourisDetail/:id',
        element: <PriviteRoutes><TourDetails /></PriviteRoutes>,
        loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/tour/${params.id}`)
      },
      {
        path: '/allPakages',
        element: <AllPakages />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signUp',
        element: <SignUP />,
      }
    ]
  },
  {
    path: 'dashboard',
    element: <PriviteRoutes><Dashboard /></PriviteRoutes>,
    children: [
      // Normal user routes
      {
        path: 'wishList',
        element: <MyWishList />,
      },
      {
        path: 'booking',
        element: <MyBooking />,
      },
      {
        path: 'userProfile',
        element: <UserProfile />,
      },
      // Admin routes
      {
        path: 'manageUser',
        element: <ManageUser />,
      },
      {
        path: 'addPakage',
        element: <AddPakage />,
      },
      {
        path: 'adminProfile',
        element: <AdminProfile />,
      },
      // Guide routes
      {
        path: 'myAssigned',
        element: <MyAssigned />,
      },
      {
        path: 'guideDetails/:id',
        element: <GuideDetails />,
      },
      {
        path: 'guideProfile',
        element: <GuideProfile />
      }
    ]
  }
]);
