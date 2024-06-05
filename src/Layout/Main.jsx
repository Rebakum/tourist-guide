import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";
import Footer from "../Shared/Navbar/Footer/Footer";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const Main = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <Navbar></Navbar>
            <div className="min-h-[cale-306px] poppins text-cyan-900">
            <Outlet></Outlet>            
            </div>
            <Footer></Footer>
            <ToastContainer />
        </div>
    );
};

export default Main;