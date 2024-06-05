

const MyBooking = () => {
    return (
        <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
        <table className="min-w-full bg-white">
            <thead>
                <tr>
                    <th className="py-2">Package Name</th>
                    <th className="py-2">Tour Guide Name</th>
                    <th className="py-2">Tour Date</th>
                    <th className="py-2">Tour Price</th>
                    <th className="py-2">Status</th>
                    <th className="py-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {/* {bookings.map((booking) => (
                    <tr key={booking._id}>
                        <td className="border px-4 py-2">{booking.packageName}</td>
                        <td className="border px-4 py-2">{booking.guideName}</td>
                        <td className="border px-4 py-2">{new Date(booking.tourDate).toLocaleDateString()}</td>
                        <td className="border px-4 py-2">${booking.price}</td>
                        <td className="border px-4 py-2">{booking.status}</td>
                        <td className="border px-4 py-2">
                            {booking.status === 'Accepted' && (
                                <button
                                    onClick={() => handlePay(booking._id)}
                                    className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2"
                                >
                                    Pay
                                </button>
                            )}
                            {booking.status === 'In Review' && (
                                <button
                                    onClick={() => handleCancel(booking._id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                                >
                                    Cancel
                                </button>
                            )}
                        </td>
                    </tr>
                ))} */}
            </tbody>
        </table>
    </div>
);
};


export default MyBooking;