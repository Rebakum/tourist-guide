import  { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../Hook/useAuth";
import useAxiosSecure from "../Hook/useAxiosSecure";

const Dashboard = () => {
    const { logOut, user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
    const [isGuide, setIsGuide] = useState(false);

    useEffect(() => {
        // Fetch user role from the database
        const fetchUserRole = async () => {
            const response = await axiosSecure.get(`/users/${user?.email}`);
            const { role } = response.data;
            if (role === 'admin') {
                setIsAdmin(true);

            } else if (role === 'tour guide') {
                setIsGuide(true);
            }
        };

        if (user?.email) {
            fetchUserRole();
        }
    }, [user, axiosSecure]);

    const handleLogout = () => {
        logOut();
        navigate('/');
    };

    return (
        <div className="flex min-h-screen">
            <div className="w-64 min-h-full bg-cyan-950 opacity-70 text-white text-center py-20 px-5">
                <h2 className="text-2xl font-bold">T & T</h2>
                <h3 className="text-3xl font-medium">DASHBOARD</h3>
                <ul className="menu my-10">
                    {isAdmin && (
                        <>
                            {/* Admin user */}
                            <li><NavLink to='/dashboard/addPackage'>ADD Package</NavLink></li>
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
                        </>
                    )}

                    <div className="divider border-red-500"></div>
                    <li><NavLink to='/'>Home</NavLink></li>
                    <li>
                        <button onClick={handleLogout} className="btn btn-sm btn-ghost">Logout</button>
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
