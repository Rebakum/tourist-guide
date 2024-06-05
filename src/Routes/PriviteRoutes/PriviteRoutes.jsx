
import { Navigate, useLocation } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import useAuth from "../../Hook/useAuth";


const PriviteRoutes = ({children}) => {
    const {user, loading} =useAuth()
    const location = useLocation()
   if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <ClipLoader size={50} color={"#123abc"} loading={loading} />
            </div>
        );
    }
   
    if(user){
        return children
    }
    return <Navigate to="/login" state={{from:location}} replace></Navigate>
  
};

export default PriviteRoutes;