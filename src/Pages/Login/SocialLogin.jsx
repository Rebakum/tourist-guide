import { useContext } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";


const SocialLogin = () => {
    const { googleLogin} = useContext(AuthContext);


    //navigation sistem
    const navigate = useNavigate();
    const location = useLocation()
    const from = location?.state || '/'



    const handleSocialLogin = (socialProvider) => {
        socialProvider()
            .then(result => {
                if (result.user) {
                    navigate(from)

                }
            })

    }
    return (
        <div className="">
            <div className="divider">contiue with</div>
            <div className="flex justify-center items-center gap-3">
                <div className="">
                    <button onClick={() => handleSocialLogin(googleLogin)} className="btn btn-sm btn-secondary">Google</button>
                </div>
               
            </div>
        </div>
    );
};

export default SocialLogin;