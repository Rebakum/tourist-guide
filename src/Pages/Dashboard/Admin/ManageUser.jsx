import SectionTitle from "../../../Shared/Navbar/SectionTitle";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import LoadingSpinner from "../../../Shared/Navbar/Loading/LoadingSpinner";
import { FaTrashAlt, FaUsers, FaUserShield } from "react-icons/fa";
import Swal from "sweetalert2";

const ManageUser = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const handleMakeAdmin = async (user) => {
        try {
            const res = await axiosSecure.patch(`/users/admin/${user._id}`);
            if (res.data.modifiedCount > 0) {
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.name} is an Admin Now!`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleMakeTourGuide = async (user) => {
        try {
            const res = await axiosSecure.patch(`/users/tourguide/${user._id}`);
            if (res.data.modifiedCount > 0) {
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.name} is a Tour Guide Now!`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteUser = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/users/${user._id}`);
                    if (res.data.deletedCount > 0) {
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "User has been deleted.",
                            icon: "success"
                        });
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        });
    };

    if (!users.length) return <LoadingSpinner />;

    return (
        <div>
            <Helmet>
                <title>T & T || Manage Users</title>
            </Helmet>
            <SectionTitle heading="Manage Users" />
            <div className="flex justify-evenly my-4">
                <h2 className="text-3xl">All Users</h2>
                <h2 className="text-3xl">Total Users: {users.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions/Admin</th>
                            <th>Actions/Guide</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <button
                                        onClick={() => handleMakeAdmin(user)}
                                        className="btn btn-primary btn-sm mr-2"
                                        disabled={user.role === 'admin'}
                                    >
                                        <FaUserShield className="mr-1" /> Make Admin
                                    </button>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleMakeTourGuide(user)}
                                        className="btn btn-secondary btn-sm mr-2"
                                        disabled={user.role === 'tour guide'}
                                    >
                                        <FaUsers className="mr-1" /> Make Tour Guide
                                    </button>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDeleteUser(user)}
                                        className="btn btn-danger btn-sm"
                                    >
                                        <FaTrashAlt />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUser;
