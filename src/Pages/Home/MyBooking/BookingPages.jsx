import React, { useContext, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { AuthContext } from '../../../AuthProvider/AuthProvider';

const BookingPages = ({ tour }) => {
    const { title, tourGuide, tourPlan } = tour;
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [tourDate, setTourDate] = useState(null);
    const [guideName, setGuideName] = useState('');
    const [selectedPrice, setSelectedPrice] = useState('');
    const [selectedDay, setSelectedDay] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);

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
        navigate('/my-bookings');
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold my-4">Book Your Tour</h2>
            <form onSubmit={handleBookNow}>
                <div className="flex justify-center items-center mb-4">
                    <div className="w-1/2 p-2">
                        <label className="block text-gray-700 mb-2">Package Name</label>
                        <input
                            type="text"
                            value={title}
                            readOnly
                            className="w-full p-2 border rounded-lg"
                        />
                    </div>
                    <div className="w-1/2 p-2">
                        <label className="block text-gray-700 mb-2">Tourist Name</label>
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
                        <label className="block text-gray-700 mb-2">Tourist Email</label>
                        <input
                            type="text"
                            value={user?.email}
                            readOnly
                            className="w-full p-2 border rounded-lg"
                        />
                    </div>
                    <div className="w-1/2 p-2">
                        <label className="block text-gray-700 mb-2">Tourist Image</label>
                        <img
                            src={user?.photoURL}
                            alt="Tourist"
                            className="w-16 h-16 rounded-full"
                        />
                    </div>
                </div>
                <div className="flex justify-center items-center mb-4">
                    <div className="w-1/2 p-2">
                        <label className="block text-gray-700 mb-2">Price</label>
                        <select
                            value={selectedPrice}
                            onChange={e => setSelectedPrice(e.target.value)}
                            className="w-full p-2 border rounded-lg"
                        >
                            <option value="">Select a price plan</option>
                            {tourPlan.map(plan => (
                                <option key={plan.name} value={plan.price}>
                                    {plan.name}  {plan.price}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="w-1/2 p-2">
                        <label className="block text-gray-700 mb-2">Day</label>
                        <select
                            value={selectedDay}
                            onChange={e => setSelectedDay(e.target.value)}
                            className="w-full p-2 border rounded-lg"
                        >
                            <option value="">Select a day plan</option>
                            {tourPlan.map(plan => (
                                <option key={plan.name} value={plan.day}>
                                    {plan.name}  {plan.day} days 
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="mb-4 p-2">
                    <label className="block text-gray-700 mb-2">Tour Guide Name</label>
                    <select
                        value={guideName}
                        onChange={e => setGuideName(e.target.value)}
                        className="w-full p-2 border rounded-lg"
                    >
                        <option value="">Select a guide</option>
                        {tourGuide.map(guide => (
                            <option key={guide.name} value={guide.name}>
                                {guide.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4 p-2">
                    <label className="block text-gray-700 mb-2">Tour Date</label>
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
                <p><strong>Guide Name:</strong> {guideName}</p>
                <p><strong>Price:</strong> ${selectedPrice}</p>
                <p><strong>Day:</strong> {selectedDay}</p>
                <div className="flex justify-end mt-4">
                    <button
                        onClick={closeModal}
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
