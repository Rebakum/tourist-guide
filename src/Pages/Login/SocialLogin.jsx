import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import 'react-toastify/dist/ReactToastify.css';
import useAxiosPublic from "../../Hook/useAxiosPublic";
import useAuth from "../../Hook/useAuth";


const SocialLogin = () => {
    const { googleLogin } = useAuth()
    const axiosPublic = useAxiosPublic();


    //navigation sistem
    const navigate = useNavigate();
    const location = useLocation()
    const path = location?.state?.from?.pathname || '/';



    const handleSocialLogin = (socialProvider) => {
        socialProvider()
            .then(result => {
                console.log(result.user)
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    photoUrl: result.user?.photoUrl

                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data)
                        if (result.user) {
                            navigate(path)

                        }
                    })

            })

    }
    return (
        <div className="">
            <div className="divider">contiue with</div>
            <div className="flex justify-center items-center rounded-2xl  gap-3">
                <div className="">
                    <button onClick={() => handleSocialLogin(googleLogin)} className="btn btn-md color text-xl">Google</button>
                </div>

            </div>
        </div>
    );
};

export default SocialLogin;