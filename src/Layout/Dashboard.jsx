import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../Hook/useAuth";
import useAxiosSecure from "../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../Shared/Navbar/Loading/LoadingSpinner";
import RequestModal from "../Pages/Dashboard/UserPage/RequestModal";
import { toast } from "react-toastify";
import useRole from "../Hook/useRole";

const Dashboard = () => {
    const {role} = useRole()
    const { logOut, user } = useAuth();
    const [isOpen, setIsOpen] = useState(false)
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
    const [isGuide, setIsGuide] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false)
    

    const { data: userData, isLoading } = useQuery({
        queryKey: ['user', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            try {
                const response = await axiosSecure.get(`/users/${user?.email}`);
                const role = response.data?.role;
                if (role === 'admin') {
                    setIsAdmin(true);
                } else if (role === 'tour guide') {
                    setIsGuide(true);
                }
                return response.data;
            } catch (error) {
                console.error("Error fetching user role:", error);
                if (error.response && error.response.status === 404) {
                    console.log("User not found");
                } else {
                    console.log("An error occurred");
                }
            }
        }
    });
    console.log(userData)

    const closeModal = () => {
        setIsModalOpen(false)
      }
    const modalHandler = async () => {
        console.log('I want to be a host')
        try {
          const currentUser = {
            email: user?.email,
            role: 'guest',
            status: 'Requested',
          }
          const { data } = await axiosSecure.put(`/user`, currentUser)
          console.log(data)
          if (data.modifiedCount > 0) {
            toast.success('Success! Please wait for admin confirmation')
          } else {
            toast.success('Please!, Wait for admin approval👊')
          }
        } catch (err) {
          console.log(err)
          toast.error(err.message)
        } finally {
          closeModal()
        }
      }
    if (isLoading) return <div><LoadingSpinner /></div>;

    const handleLogout = () => {
        logOut();
        navigate('/');
    };

    return (
        <div className="flex min-h-screen">
            <div className="w-64 min-h-full bg-cyan-950 opacity-70 text-white text-center py-20 px-5">
                <h2 className="text-2xl font-bold">T & T</h2>
                <h3 className="text-3xl font-medium">DASHBOARD</h3>
                <div className="flex justify-center items-center flex-col">
                    <img className="size-12 rounded-full" src={user.photoURL} alt="" />
                    <span>{role}</span>
                    <p>{user.displayName}</p>
                </div>
                
                <ul className="menu my-10 text-xl">
                    {isAdmin && (
                        <>
                            {/* Admin user */}
                            <li><NavLink to='/dashboard/addPakage'>ADD Package</NavLink></li>
                            <li><NavLink to='/dashboard/manageUser'>Manage User</NavLink></li>
                            <li><NavLink to='/dashboard/adminProfile'>Admin Profile</NavLink></li>
                        </>
                    )}
                    {isGuide && (
                        <>
                            {/* Guide user */}
                            <li><NavLink to='/dashboard/myAssigned'>My Assigned</NavLink></li>
                            <li><NavLink to='/dashboard/guideProfile'>Guide Profile</NavLink></li>
                        </>
                    )}
                    {!isAdmin && !isGuide && user && (
                        <>
                            {/* Normal user */}
                            <li><NavLink to='/dashboard/wishList'>My Wishlist</NavLink></li>
                            <li><NavLink to='/dashboard/booking'>My Booking</NavLink></li>
                            <li><NavLink to='/dashboard/userProfile'>My Profile</NavLink></li>
                            <li
                                // disabled={!user}
                                onClick={() => setIsModalOpen(true)}
                                className='disabled:cursor-not-allowed cursor-pointer hover:bg-neutral-100 py-3 px-4 text-sm font-semibold rounded-full  transition'
                            >
                                Host your home
                            </li>
                            <RequestModal
                                isOpen={isModalOpen}
                                closeModal={closeModal}
                                modalHandler={modalHandler}
                            />
                        </>
                    )}

                    <div className="divider border-red-500"></div>
                    <li><NavLink to='/'>Home</NavLink></li>
                    <li>
                        <button onClick={handleLogout} className="btn btn-ghost text-xl">Logout</button>
                    </li>
                </ul>
            </div>
            <div className="flex-1 mx-10">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
