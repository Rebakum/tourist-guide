// import { Link } from "react-router-dom";
// import useTour from "../../../Hook/useTour";
// import Swal from "sweetalert2";
// import useAxiosSecure from "../../../Hook/useAxiosSecure";
// import { Helmet } from "react-helmet";

// const MyWishList = () => {
//     const [tourData, refetch] = useTour();
//     const axiosSecure = useAxiosSecure();

//     const handleDelete = (_id) => {
//         Swal.fire({
//             title: "Are you sure?",
//             text: "You won't be able to revert this!",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#3085d6",
//             cancelButtonColor: "#d33",
//             confirmButtonText: "Yes, delete it!"
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 axiosSecure.delete(`/wishLists/${_id}`).then(res => {
//                     if (res.data.deletedCount > 0) {
//                         refetch();
//                         Swal.fire({
//                             title: "Deleted!",
//                             text: "Your file has been deleted.",
//                             icon: "success"
//                         });
//                     }
//                 });
//             }
//         });
//     };

//     return (
//         <>
//             <div>
//                 <Helmet>
//                     <title>T & T || My Wishlist</title>
//                 </Helmet>
//             </div>
//             <div className="">
//                 <div className="flex justify-center items-center flex-col">
//                     <h2 className="text-3xl text-center my-10 font-bold border-t-2 border-b-2 w-52 py-2">
//                         My Wishlist
//                     </h2>
//                 </div>
//                 <table className="table">
//                     <thead className="bg-cyan-950 opacity-70 text-white uppercase text-lg">
//                         <tr>
//                             <th>#</th>
//                             <th>Tour Type</th>
//                             <th>Title</th>
//                             <th>Day 1</th>
//                             <th>Day 2</th>
//                             <th>Day 3</th>
//                             <th>Delete</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody className="bg-cyan-200 border-2 border-cyan-950">
//                         {tourData?.map((data, index) => (
//                             <tr key={data._id}>
//                                 <th>{index + 1}</th>
//                                 <td>
//                                     <div className="flex items-center gap-3">
//                                         <div className="avatar">
//                                             <div className="mask mask-squircle w-12 h-12">
//                                                 <img src={data.photoUrls[2]} alt={data.title} />
//                                             </div>
//                                         </div>
//                                         <div>
//                                             <div className="font-bold">{data.tourType}</div>
//                                         </div>
//                                     </div>
//                                 </td>
//                                 <td>{data.title}</td>
//                                 {data.tourPlan?.map((plan, planIndex) => (
//                                     <td key={planIndex}>{plan.price}</td>
//                                 ))}
//                                 <td>
//                                     <button
//                                         onClick={() => handleDelete(data._id)}
//                                         className="btn btn-ghost btn-xs bg-red-500 text-white"
//                                     >
//                                         Delete
//                                     </button>
//                                 </td>
//                                 <td>
//                                     <Link to={`/tourisDetail/${data.tourId}`}>
//                                         <button className="btn btn-ghost btn-xs bg-cyan-700 text-white">
//                                             Details
//                                         </button>
//                                     </Link>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </>
//     );
// };

// export default MyWishList;

import { Link } from "react-router-dom";
import useTour from "../../../Hook/useTour";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { Helmet } from "react-helmet";
import { useState } from "react";

const MyWishList = () => {
    const { tourData, isLoading, refetch, currentPage, setCurrentPage } = useTour();
    const axiosSecure = useAxiosSecure();
    const { wishLists, total } = tourData;
    const totalPages = Math.ceil(total / 10);

    const handleDelete = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/wishLists/${_id}`).then(res => {
                    if (res.data.deletedCount > 0) {
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    }
                });
            }
        });
    };

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Helmet>
                <title>T & T || My Wishlist</title>
            </Helmet>
            <div className="flex justify-center items-center flex-col">
                <h2 className="text-3xl text-center my-10 font-bold border-t-2 border-b-2 w-52 py-2">
                    My Wishlist
                </h2>
            </div>
            <table className="table">
                <thead className="bg-cyan-950 opacity-70 text-white uppercase text-lg">
                    <tr>
                        <th>#</th>
                        <th>Tour Type</th>
                        <th>Title</th>
                        <th>Day 1</th>
                        <th>Day 2</th>
                        <th>Day 3</th>
                        <th>Delete</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className="bg-cyan-200 border-2 border-cyan-950">
                    {Array.isArray(wishLists) && wishLists.length > 0 ? (
                        wishLists.map((data, index) => (
                            <tr key={data._id}>
                                <th>{(currentPage - 1) * 10 + index + 1}</th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={data.photoUrls[2]} alt={data.title} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{data.tourType}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{data.title}</td>
                                {data.tourPlan && data.tourPlan.map((plan, planIndex) => (
                                    <td key={planIndex}>{plan.price}</td>
                                ))}
                                <td>
                                    <button
                                        onClick={() => handleDelete(data._id)}
                                        className="btn btn-ghost btn-xs bg-red-500 text-white"
                                    >
                                        Delete
                                    </button>
                                </td>
                                <td>
                                    <Link to={`/tourisDetail/${data.tourId}`}>
                                        <button className="btn btn-ghost btn-xs bg-cyan-700 text-white">
                                            Details
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="text-center">
                                No wishlist items found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className="flex justify-center my-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="btn btn-ghost"
                >
                    Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`btn ${currentPage === index + 1 ? 'btn-primary' : 'btn-ghost'}`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="btn btn-ghost"
                >
                    Next
                </button>
            </div>
        </>
    );
};

export default MyWishList;
