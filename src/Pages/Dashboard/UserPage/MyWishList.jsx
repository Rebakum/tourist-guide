import { Link } from "react-router-dom";
import useTour from "../../../Hook/useTour";
import SectionTitle from "../../../Shared/Navbar/SectionTitle";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const MyWishList = () => {
    const [tourData, refetch] = useTour();
    const axiosSecure = useAxiosSecure();

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

    return (
        <>
            <SectionTitle
                subheading="T&T is a specific category"
                heading="My Wishlist"
                className="my-10"
            />
            <div className="overflow-x-auto">
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
                        {tourData?.map((data, index) => (
                            <tr key={data._id}>
                                <th>{index + 1}</th>
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
                                {data.tourPlan?.map((plan, planIndex) => (
                                    <td key={planIndex}>${plan.price}</td>
                                ))}
                                <td>
                                    <button
                                        onClick={() => handleDelete(data._id)}
                                        className="btn btn-ghost btn-xs bg-red-500 text-white"
                                    >
                                        delete
                                    </button>
                                </td>
                                <td>
                                    <Link to={`/tourisDetail/${data.tourId}`}>
                                        <button className="btn btn-ghost btn-xs bg-cyan-700 text-white">
                                            details
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default MyWishList;
