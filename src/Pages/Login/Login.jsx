import { Link,  Navigate,  useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import SocialLogin from "./SocialLogin";
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useForm } from "react-hook-form";
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const path = location?.state?.from?.pathname || '/';
    console.log(location)
    const { signInUser } = useContext(AuthContext);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        const { email, password } = data;

        signInUser(email, password)
            .then(result => {
                toast.success('Yeah!! You are welcome');
                if (result.user)
                    navigate(path)
            })
            .catch(error => {
                console.log(error);
                toast.warn('Please check email and password');
            });
    };

    return (
        <div className="hero min-h-screen bg-sky-400">
            <div className=" flex flex-col lg:flex-row  justify-between items-center shadow-2xl gap-0 p-5">
                
                <div>
                    {/* <h1 className="text-4xl text-center font-bold">Login now!</h1> */}

                    <div className=" shrink-0 w-full h-full justify-center items-center flex-1 p-5">
                        <h1 className="text-3xl font-bold text-center my-5">Please login</h1>

                        <form onSubmit={handleSubmit(onSubmit)} className="card-body w-full">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" className="input input-bordered"{...register("email", { required: true })} />
                                {errors.exampleRequired && <span>This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" className="input input-bordered" {...register("password", { required: true })} />
                                {errors.exampleRequired && <span>This field is required</span>}

                            </div>

                            <div className="flex justify-between items-center">
                                <label htmlFor="" className="label">
                                    <Link className="text-primary" >Porgot password !</Link>
                                    <small>No account plese <Link to="/signUp" className="text-primary">SignUp</Link></small>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary font-bold bg-btn">Login</button>
                            </div>
                        </form>
                       <SocialLogin></SocialLogin>
                    
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;