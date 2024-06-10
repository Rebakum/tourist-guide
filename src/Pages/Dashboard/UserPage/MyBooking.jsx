import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import useAuth from "../../../Hook/useAuth";
import LoadingSpinner from "../../../Shared/Navbar/Loading/LoadingSpinner";
import Swal from "sweetalert2";

const MyBooking = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { data: bookings = [], isLoading, error, refetch } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const respons = await axiosSecure.get(`/bookings/${user.email}`)
            return respons.data;
        }
    });

    const handlePay = async (id) => {
        try {
            const res = await axiosSecure.patch(`/bookings/pay/${id}`);
            if (res.data.modifiedCount > 0) {
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Payment Successful!`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleCancel = async (id) => {
        try {
            const res = await axiosSecure.delete(`/bookings/cancel/${id}`);
            if (res.data.deletedCount > 0) {
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: `Booking Cancelled!`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    if (isLoading) return <div> <LoadingSpinner /></div>;

    return (
        <div className="p-4">
             <div className="flex justify-center items-center flex-col">
                <h2 className="text-3xl text-center my-10 font-bold border-t-2 border-b-2 w-52 py-2">
                   My booking
                </h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Package Name</th>
                            <th>Price</th>
                            <th>Date</th>
                            <th>status</th>
                            <th>Pay</th>
                            <th>Cancel</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map(booking => (
                            <tr key={booking._id}>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={booking.touristImage} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{booking.touristName}</div>
                                            <div className="text-sm opacity-50">{booking.touristEmail}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {booking.title}
                                    <br />
                                    <span className="badge badge-ghost badge-sm">{booking.guideName}</span>
                                </td>
                                <td> ${booking.price}</td>
                                <td>  {new Date(booking.tourDate).toLocaleDateString()} day</td>
                                <td>{booking.status}</td>
                                <th>


                                    <button
                                        onClick={() => handlePay(booking._id)}
                                        className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2 btn"
                                        disabled={booking.status === 'In nreview'}
                                    >
                                        pay
                                    </button>


                                </th>
                                <th>

                                    <button
                                        onClick={() => handleCancel(booking._id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg btn"
                                        disabled={booking.status === "Accepted"}
                                    >
                                        Cancel</button>


                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyBooking;
