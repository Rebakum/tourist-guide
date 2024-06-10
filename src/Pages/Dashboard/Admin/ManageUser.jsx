import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import Select from "react-select";
import { FaTrashAlt, FaUsers, FaUserShield } from "react-icons/fa";
import useAxiosSecure from "../../../Hook/useAxiosSecure";


const ManageUser = () => {
    const [search, setSearch] = useState("");
    const [role, setRole] = useState(null);
    const axiosSecure = useAxiosSecure();

    const roles = [
        { value: "admin", label: "Admin" },
        { value: "tour guide", label: "Tour Guide" },
        { value: "user", label: "User" },
    ];

    const { data: users = [], refetch } = useQuery({
        queryKey: ["users", { search, role }],
        queryFn: async () => {
            const params = {};
            if (search) params.search = search;
            if (role) params.role = role.value;
            const res = await axiosSecure.get("/users", { params });
            return res.data;
        },
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

    const filteredUsers = users.filter((user) => {
        const matchesSearch =
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase());
        const matchesRole = role ? user.role === role.value : true;
        return matchesSearch && matchesRole;
    });
    //   if (isLoading) return <LoadingSpinner />;

    return (
        <div>
            <Helmet>
                <title>T & T || Manage Users</title>
            </Helmet>
            <div className="flex justify-center items-center flex-col">
                <h2 className="text-3xl text-center my-10 font-bold border-t-2 border-b-2 w-52 py-2">
                    Manage Users
                </h2>
            </div>
            <div className="flex justify-evenly my-4">
                <div>
                    <input
                        type="text"
                        placeholder="Search by name or email"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="input input-bordered"
                    />
                    <Select
                        options={roles}
                        value={role}
                        onChange={setRole}
                        placeholder="Filter by role"
                        isClearable
                        className="mt-2"
                    />
                </div>
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
                        {filteredUsers.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <button
                                        onClick={() => handleMakeAdmin(user)}
                                        className="btn btn-primary btn-sm mr-2"
                                        disabled={user.role === "admin"}
                                    >
                                        <FaUserShield className="mr-1" /> Make Admin
                                    </button>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleMakeTourGuide(user)}
                                        className="btn btn-secondary btn-sm mr-2"
                                        disabled={user.role === "tour guide" || user.role === "admin"}
                                    >
                                        <FaUsers className="mr-1" /> Make Tour Guide
                                    </button>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDeleteUser(user)}
                                        className="btn btn-danger btn-sm"
                                        disabled={user.role === "admin"}
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




// import SectionTitle from "../../../Shared/Navbar/SectionTitle";
// import useAxiosSecure from "../../../Hook/useAxiosSecure";
// import { useQuery } from "@tanstack/react-query";
// import { Helmet } from "react-helmet";
// import LoadingSpinner from "../../../Shared/Navbar/Loading/LoadingSpinner";
// import { FaTrashAlt, FaUsers, FaUserShield } from "react-icons/fa";
// import Swal from "sweetalert2";

// const ManageUser = () => {
//     const axiosSecure = useAxiosSecure();
//     const { data: users = [], refetch } = useQuery({
//         queryKey: ['users'],
//         queryFn: async () => {
//             const res = await axiosSecure.get('/users');
//             return res.data;
//         }
//     });

//     const handleMakeAdmin = async (user) => {
//         try {
//             const res = await axiosSecure.patch(`/users/admin/${user._id}`);
//             if (res.data.modifiedCount > 0) {
//                 refetch();
//                 Swal.fire({
//                     position: "top-end",
//                     icon: "success",
//                     title: `${user.name} is an Admin Now!`,
//                     showConfirmButton: false,
//                     timer: 1500
//                 });
//             }
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const handleMakeTourGuide = async (user) => {
//         try {
//             const res = await axiosSecure.patch(`/users/tourguide/${user._id}`);
//             if (res.data.modifiedCount > 0) {
//                 refetch();
//                 Swal.fire({
//                     position: "top-end",
//                     icon: "success",
//                     title: `${user.name} is a Tour Guide Now!`,
//                     showConfirmButton: false,
//                     timer: 1500
//                 });
//             }
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const handleDeleteUser = (user) => {
//         Swal.fire({
//             title: "Are you sure?",
//             text: "You won't be able to revert this!",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#3085d6",
//             cancelButtonColor: "#d33",
//             confirmButtonText: "Yes, delete it!"
//         }).then(async (result) => {
//             if (result.isConfirmed) {
//                 try {
//                     const res = await axiosSecure.delete(`/users/${user._id}`);
//                     if (res.data.deletedCount > 0) {
//                         refetch();
//                         Swal.fire({
//                             title: "Deleted!",
//                             text: "User has been deleted.",
//                             icon: "success"
//                         });
//                     }
//                 } catch (error) {
//                     console.error(error);
//                 }
//             }
//         });
//     };

//     if (!users.length) return <LoadingSpinner />;

//     return (
//         <div>
//             <Helmet>
//                 <title>T & T || Manage Users</title>
//             </Helmet>
//            <h2 className="text-3xl text-center my-10 font-bold border-t-2 border-b-2 w-52 "> Manage Users</h2>
//             <div className="flex justify-evenly my-4">
//                 <details className="dropdown">
//                     <summary className="m-1 btn">open or close</summary>
//                     <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
//                         <li><a>Item 1</a></li>
//                         <li><a>Item 2</a></li>
//                     </ul>
//                 </details>
//                 <h2 className="text-3xl">All Users</h2>
//                 <h2 className="text-3xl">Total Users: {users.length}</h2>
//             </div>
//             <div className="overflow-x-auto">
//                 <table className="table table-zebra w-full">
//                     <thead>
//                         <tr>
//                             <th>#</th>
//                             <th>Name</th>
//                             <th>Email</th>
//                             <th>Role</th>
//                             <th>Actions/Admin</th>
//                             <th>Actions/Guide</th>
//                             <th>Delete</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {users.map((user, index) => (
//                             <tr key={user._id}>
//                                 <td>{index + 1}</td>
//                                 <td>{user.name}</td>
//                                 <td>{user.email}</td>
//                                 <td>{user.role}</td>
//                                 <td>
//                                     <button
//                                         onClick={() => handleMakeAdmin(user)}

//                                         className="btn btn-primary btn-sm mr-2"
//                                         disabled={user.role === 'admin'}
//                                     >
//                                         <FaUserShield className="mr-1" /> Make Admin
//                                     </button>
//                                 </td>
//                                 <td>
//                                     <button
//                                         onClick={() => handleMakeTourGuide(user)}
//                                         className="btn btn-secondary btn-sm mr-2"
//                                         disabled={user.role === 'tour guide' || user.role == 'admin'}

//                                     >
//                                         <FaUsers className="mr-1" /> Make Tour Guide
//                                     </button>
//                                 </td>
//                                 <td>
//                                     <button
//                                         onClick={() => handleDeleteUser(user)}
//                                         className="btn btn-danger btn-sm"
//                                         disabled={user.role === 'admin'}
//                                     >
//                                         <FaTrashAlt />
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default ManageUser;
