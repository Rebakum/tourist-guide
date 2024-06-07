import { useParams } from "react-router-dom";
import ReactStarsRating from 'react-awesome-stars-rating';
import { useState } from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../Shared/Navbar/Loading/LoadingSpinner";
import useAuth from "../../../Hook/useAuth";

const GuideProfile = () => {
    const { user } = useAuth()
    const { id } = useParams();
    const [rating, setRating] = useState(0);
    const axiosSecure = useAxiosSecure();


    const { data: guide, isLoading, error } = useQuery({
        queryKey: ['guide', id],
        queryFn: async () => {
            const response = await axiosSecure.get(`/guides/${id}`);
            console.log(response.data);
            return response.data;
        }
    });

    if (isLoading) {
        return <div><LoadingSpinner /></div>;
    }

    if (error) {
        return <div>Error loading guide data</div>;
    }

    const {
        guideName,
        guideImage,
        guideEmail,
        guideAddress,
        guidePhone,
        position,
        university,
        year
    } = guide;

    const onChange = (value) => {
        console.log(`React Stars Rating value is ${value}`);
        setRating(value);
    };

    return (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-6">
                <img
                    src={guideImage}
                    alt={guideName}
                    className="w-32 h-32 rounded-full object-cover mr-6"
                />
                <div>
                    <h2 className="text-2xl font-semibold">{guideName}</h2>
                    <p className="text-gray-600">Email: {guideEmail}</p>
                    <p className="text-gray-600">Phone: {guidePhone}</p>
                    <p className="text-gray-600">Address: {guideAddress}</p>
                    <p className="text-gray-600">Position: {position}</p>
                    <p className="text-gray-600">University: {university}</p>
                    <p className="text-gray-600">Year: {year}</p>
                </div>
            </div>

            <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Rate this Guide</h3>
                <ReactStarsRating
                    onChange={onChange}
                    value={rating}
                />
                <h3 className="text-xl font-semibold mb-4 mt-8">Add a Story</h3>

                <form action="/submit-story" method="POST">
                    <div className="flex justify-center items-center mb-4">

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
                                src={user?.photoURL}
                                alt="Tourist"
                                className="w-16 h-16 rounded-full"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 mb-2">Story Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="story" className="block text-gray-700 mb-2">Story</label>
                        <textarea
                            id="story"
                            name="story"
                            rows="5"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        Submit
                    </button>


                </form>
            </div>
        </div>
    );
};

export default GuideProfile;
