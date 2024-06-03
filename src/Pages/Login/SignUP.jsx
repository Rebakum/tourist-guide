

import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useForm } from "react-hook-form";


const SignUP = () => {
   
        const navigate = useNavigate();
        const location = useLocation();
        const from = location?.state || '/';
        const ridiract = () => {
            navigate(from)
        }
        const passwordChecker = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()])/
        const { createUser, setUser, updateUserProfile } = useContext(AuthContext);
        const { register, handleSubmit, formState: { errors } } = useForm();
        const onSubmit = (data) => {
            const { email, password, name, photoURL } = data;
            if (passwordChecker.test(password)) {
                createUser(email, password)
                    .then(result => {
                        updateUserProfile(name, photoURL)
                            .then(() => {
                                setUser(result.user)
                                setTimeout(ridiract, 0)
                                toast.success('You have registered successfully')
                            })
                    })
            } else {
                toast.warn('Password must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character');
            }
        }
    return (
        <div>
            <div className="hero w-full min-h-screen bg-sky-400  ">
            <div className=" flex flex-col lg:flex-row  justify-between items-center rounded-2xl  ">
                    <div className="shrink-0 w-full h-full justify-center items-center flex-1 p-5">
                        <h1 className="text-3xl font-bold text-center p-5 my-6">New  Sign up now!</h1>
                        <div className="card  w-full h-full bg-base-100 p-5">
                            <form onSubmit={handleSubmit(onSubmit)} className="card-body bg-sky-400 rounded-2xl ">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input type="text" placeholder="Name" className="input input-bordered" {...register("name", { required: true })} />
                                    {errors.name && <span className='text-red-500'>This field is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" placeholder="Email" className="input input-bordered" {...register("email", { required: true })} />
                                    {errors.email && <span className='text-red-500'>This field is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">PhotoURL</span>
                                    </label>
                                    <input type="text" placeholder="PhotoURL" className="input input-bordered" {...register("photoURL")} />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" placeholder="Password" className="input input-bordered" {...register("password", { required: true })} />
                                    {errors.password && <span className='text-red-500'>This field is required</span>}
                                    <label className="label">
                                        <Link to='/login' className="label-text-alt link link-hover">Have an account <span className='text-primary'>Login now</span></Link>
                                    </label>
                                </div>
                                <div className="form-control">
                                    <button type="submit" className="btn btn-primary bg-btn font-bold">SignUp</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default SignUP;