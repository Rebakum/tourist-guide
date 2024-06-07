import { useContext, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaUser } from 'react-icons/fa';

const BookingPages = ({ tour }) => {
    const { title, tourPlan } = tour;
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [tourDate, setTourDate] = useState(null);
    const [selectedGuideName, setSelectedGuideName] = useState('');  // Add this line
    const [selectedPrice, setSelectedPrice] = useState('');
    const [selectedDay, setSelectedDay] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const axiosSecure = useAxiosSecure();
    const { data: guides = [] } = useQuery({
        queryKey: ['guides'],
        queryFn: async () => {
            const response = await axiosSecure.get('/guides');
            console.log(response.data);
            return response.data;
        }
    });

    const handleBookNow = (e) => {
        e.preventDefault();
        if (!user) {
            navigate('/login');
            return;
        }
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        navigate('/dashboard/booking');
    };

    const confirmBooking = async () => {
        const bookingData = {
            title,
            touristName: user.displayName,
            touristEmail: user.email,
            touristImage: user.photoURL,
            tourDate: tourDate?.toISOString(),  // Use toISOString() instead of toJSONString()
            guideName: selectedGuideName,
            price: selectedPrice,
            day: selectedDay
        };

        try {
            const response = await axiosSecure.post('/bookings', bookingData);
            console.log(response.data);
            closeModal();
        } catch (error) {
            console.error('Error creating booking:', error);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold my-4 text-white text-center">Book Your Tour</h2>
            <form onSubmit={handleBookNow}>
                <div className="flex justify-center items-center mb-4">
                    <div className="w-1/2 p-2">
                        <label className="block text-white mb-2">Package Name</label>
                        <input
                            type="text"
                            value={title}
                            readOnly
                            className="w-full p-2 border rounded-lg"
                        />
                    </div>
                    <div className="w-1/2 p-2">
                        <label className="block text-white mb-2">Tourist Name</label>
                        <input
                            type="text"
                            value={user?.displayName || 'User name not found'}
                            readOnly
                            className="w-full p-2 border rounded-lg"
                        />
                    </div>
                </div>
                <div className="flex justify-center items-center mb-4">
                    <div className="w-1/2 p-2">
                        <label className="block text-white mb-2">Tourist Email</label>
                        <input
                            type="text"
                            value={user?.email}
                            readOnly
                            className="w-full p-2 border rounded-lg"
                        />
                    </div>
                    <div className="w-1/2 p-2">
                        <label className="block text-white mb-2">Tourist Image</label>
                        <img
                            src={user?.photoURL || <FaUser/>}
                            alt="Tourist"
                            className="w-16 h-16 rounded-full"
                        />
                    </div>
                </div>
                <div className="flex justify-center items-center mb-4">
                    <div className="w-1/2 p-2">
                        <label className="block text-white mb-2">Price</label>
                        <select
                            value={selectedPrice}
                            onChange={e => setSelectedPrice(e.target.value)}
                            className="w-full p-2 border rounded-lg"
                        >
                            <option value="">Select a price plan</option>
                            {tourPlan?.map(plan => (
                                <option key={plan.name} value={plan.price}> {/* Change the value to plan.price */}
                                    {plan.name} {plan.price}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="w-1/2 p-2">
                        <label className="block text-white mb-2">Day</label>
                        <select
                            value={selectedDay}
                            onChange={e => setSelectedDay(e.target.value)}
                            className="w-full p-2 border rounded-lg"
                        >
                            <option value="">Select a day plan</option>
                            {tourPlan?.map(plan => (
                                <option key={plan.day} value={plan.day}>
                                    {plan.name} {plan.day} days
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="mb-4 p-2">
                    <label className="block text-white mb-2">Tour Guide Name</label>
                    <select
                        value={selectedGuideName}  // Set the value attribute
                        onChange={e => setSelectedGuideName(e.target.value)}  // Add this line
                        className="w-full p-2 border rounded-lg"
                    >
                        <option value="">Select a guide</option>
                        {guides?.map(guide => (
                            <option key={guide._id} value={guide.guideName}>  {/* Set the value attribute to guide.guideName */}
                                {guide.guideName}  {/* Display the guide name */}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4 p-2">
                    <label className="block text-white mb-2">Tour Date</label>
                    <DatePicker
                        selected={tourDate}
                        onChange={date => setTourDate(date)}
                        className="w-full p-2 border rounded-lg"
                    />
                </div>
                <div className="p-2">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    >
                        Book Now
                    </button>
                </div>
            </form>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Booking Confirmation"
                className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto mt-20"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            >
                <h2 className="text-xl font-bold mb-4">Confirm your Booking</h2>
                <p className="mb-4">Please confirm your booking details.</p>
                <p><strong>Package:</strong> {title}</p>
                <p><strong>Tourist Name:</strong> {user?.displayName}</p>
                <p><strong>Tour Date:</strong> {tourDate?.toLocaleDateString()}</p>
                <p><strong>Guide Name:</strong> {selectedGuideName}</p>
                <p><strong>Price:</strong> ${selectedPrice}</p>
                <p><strong>Day:</strong> {selectedDay}</p>
                <div className="flex justify-end mt-4">
                    <button
                        onClick={confirmBooking}  // Add confirmBooking function call
                        className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2"
                    >
                        Confirm
                    </button>
                    <button
                        onClick={() => setModalIsOpen(false)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    >
                        Cancel
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default BookingPages;
