import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import useAuth from "../../../Hook/useAuth";
import LoadingSpinner from "../../../Shared/Navbar/Loading/LoadingSpinner";


const MyBooking = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { data: bookings = [], isLoading, error } = useQuery({

        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const respons = await axiosSecure.get(`/bookings/${user._id}`)
            return respons.data;
        }
    })
    // const bookingData = {
    //     title,
    //     touristName: user.displayName,
    //     touristEmail: user.email,
    //     touristImage: user.photoURL,
    //     tourDate: tourDate?.toISOString(),  // Use toISOString() instead of toJSONString()
    //     guideName: selectedGuideName,
    //     price: selectedPrice,
    //     day: selectedDay
    // };
    console.log(bookings)
    if (isLoading) return <div> <LoadingSpinner /></div>
    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Pakage name</th>
                            <th>Price</th>
                            <th>Day</th>
                            <th>Pay</th>
                            <th>Cancel</th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr>

                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={bookings.touristImage} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{bookings.touristName}</div>
                                        <div className="text-sm opacity-50">{bookings.touristEmail}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {bookings.title}
                                <br />
                                <span className="badge badge-ghost badge-sm">{bookings.guideName}</span>
                            </td>
                            <td> $ {bookings.price}</td>
                            <td> {bookings.day} day</td>
                            <td>
                                <button className="btn btn-ghost btn-xs">details</button>
                            </td>
                            <td>
                                <button className="btn btn-ghost btn-xs">details</button>
                            </td>
                        </tr>

                    </tbody>

                </table>
            </div>

        </div>
    );
};


export default MyBooking;