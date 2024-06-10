import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hook/useAuth";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import LoadingSpinner from "../../../Shared/Navbar/Loading/LoadingSpinner";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const MyAssigned = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { data: bookings = [], isLoading, error, refetch } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {  const response = await axiosSecure.get(`/bookings?guideEmail=${user?.email}`)
            return response.data;
        }
    });

    const handleAccept = async (id) => {
        try {
            const res = await axiosSecure.patch(`/bookings/accept/${id}`);
            if (res.data.modifiedCount > 0) {
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Booking Accepted!`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleReject = async (id) => {
        try {
            const res = await axiosSecure.patch(`/bookings/reject/${id}`);
            if (res.data.modifiedCount > 0) {
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: `Booking Rejected!`,
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
        <>
        <Helmet>
        <title> My Assingned </title>
      </Helmet>
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">My Assigned </h2>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Package Name</th>
                            <th>Tourist Name</th>
                            <th>Tour Date</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Accept</th>
                            <th>Reject</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map(booking => (
                            <tr key={booking._id}>
                                <td>{booking.title}</td>
                                <td>{booking.touristName}</td>
                                <td>{new Date(booking.tourDate).toLocaleDateString()}</td>
                                <td>${booking.price}</td>
                                <td>{booking.status}</td>
                                <td>
                                    
                                        <button
                                            onClick={() => handleAccept(booking._id)}
                                            className="bg-green-500 text-white px-4 py-2 rounded-lg btn"
                                            disabled={booking.status === 'Accepted'}
                                        >
                                            Accepted
                                        </button>
                                    
                                </td>
                                <td>
                                    
                                        <button
                                            onClick={() => handleReject(booking._id)}
                                            className="bg-red-500 text-white px-4 py-2 rounded-lg btn"
                                            disabled={booking.status === 'Accepted'
                                              
                                             }
                                        >
                                            Reject
                                        </button>
                                   
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </>
    );
};

export default MyAssigned;
