import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import Select from "react-select";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const ManageUser = () => {
    const [search, setSearch] = useState("");
    const [role, setRole] = useState(null);
    const [page, setPage] = useState(1); // Current page
    const [perPage, setPerPage] = useState(10); // Number of users per page
    const axiosSecure = useAxiosSecure();

    const roles = [
        { value: "admin", label: "Admin" },
        { value: "tour guide", label: "Tour Guide" },
        { value: "user", label: "User" },
    ];

    const { data: { users = [], total = 0 } = {}, refetch } = useQuery({
        queryKey: { search, role, page, perPage }, // Include pagination parameters
        queryFn: async () => {
            const params = {
                page,
                perPage,
            };
            if (search) params.search = search;
            if (role) params.role = role.value;
            const res = await axiosSecure.get("/users", { params });
            return res.data;
        },
    });

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

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
                    timer: 1500,
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
                    timer: 1500,
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
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/users/${user._id}`);
                    if (res.data.deletedCount > 0) {
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "User has been deleted.",
                            icon: "success",
                        });
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        });
    };
 // filter and 
    const filteredUsers = users.filter((user) => {
        const matchesSearch =
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase());
        const matchesRole = role ? user.role === role.value : true;
        return matchesSearch && matchesRole;
    });

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <Helmet>
                <title>T & T || Manage Users</title>
            </Helmet>
            <div className="flex justify-center items-center flex-col mb-10">
                <h2 className="text-3xl text-center font-bold border-t-2 border-b-2 w-52 py-2">
                    Manage Users
                </h2>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center my-4 space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
                    <input
                        type="text"
                        placeholder="Search by name or email"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="input input-bordered w-full max-w-xs"
                    />
                    <Select
                        options={roles}
                        value={role}
                        onChange={setRole}
                        placeholder="Filter by role"
                        isClearable
                        className="w-full max-w-xs"
                    />
                </div>
                <h2 className="text-2xl font-semibold">Total Users: {total}</h2>
            </div>
            <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
                <table className="table table-zebra w-full">
                    <thead className="bg-gray-200 text-xl">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Make Admin</th>
                            <th>Make Guide</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <button
                                        onClick={() => handleMakeAdmin(user)}
                                        className="btn bg-blue-500 text-white btn-sm mr-2"
                                        disabled={user.role === "admin"}
                                    >
                                        Make Admin
                                    </button>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleMakeTourGuide(user)}
                                        className="btn bg-green-500 text-white btn-sm mr-2"
                                        disabled={user.role === "tour guide" || user.role === "admin"}
                                    >
                                        Make Tour Guide
                                    </button>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDeleteUser(user)}
                                        className="btn bg-red-500 text-white btn-sm"
                                        disabled={user.role === "admin"}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-between items-center my-4">
                    <button
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                        className="btn bg-blue-500 text-white"
                    >
                        Previous
                    </button>
                    <span className="text-lg">{`Page ${page} of ${Math.ceil(total / perPage)}`}</span>
                    <button
                        onClick={() => handlePageChange(page + 1)}
                        disabled={users.length < perPage}
                        className="btn bg-blue-500 text-white"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ManageUser;
