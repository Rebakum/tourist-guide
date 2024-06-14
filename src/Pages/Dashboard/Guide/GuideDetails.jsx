// import { useParams } from "react-router-dom";
// import ReactStarsRating from 'react-awesome-stars-rating';
// import { useState } from "react";
// import useAxiosSecure from "../../../Hook/useAxiosSecure";
// import { useQuery, useQueryClient } from "@tanstack/react-query"; // Import useQueryClient
// import LoadingSpinner from "../../../Shared/Navbar/Loading/LoadingSpinner";
// import useAuth from "../../../Hook/useAuth";
// import Reviews from "./Reviews";
// import { ToastContainer, toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';

// const GuideDetails = () => {
//     const { user } = useAuth();
//     const { id } = useParams();
//     const [rating, setRating] = useState(0);
//     const [storyTitle, setStoryTitle] = useState("");
//     const [story, setStory] = useState("");
//     const axiosSecure = useAxiosSecure();
//     const queryClient = useQueryClient(); // Get queryClient instance

//     const { data: guide = {}, isLoading } = useQuery({
//         queryKey: ['guide', id],
//         queryFn: async () => {
//             const response = await axiosSecure.get(`/guides/${id}`);
//             return response.data;
//         }
//     });

//     const onChange = (value) => {
//         setRating(value);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const storyData = {
//             guideId: id,
//             guideName: guide?.guideName,
//             guideEmail: guide?.guideEmail,
//             rating,
//             touristName: user?.displayName || 'User name not found',
//             touristEmail: user?.email,
//             touristImage: user?.photoURL,
//             storyTitle,
//             story
//         };

//         try {
//             const response = await axiosSecure.post('/reviews', storyData);
//             if (response.data.insertedId) {
//                 toast.success('Story submitted successfully!');
//                 setStoryTitle(""); // Clear input fields after submission
//                 setStory("");
//                 queryClient.invalidateQueries(['guide', id]); // Invalidate guide query to refetch
//             } else {
//                 toast.warning('Failed to submit story.');
//             }
//         } catch (error) {
//             console.error("There was an error submitting the story:", error);
//             toast.warning('An error occurred while submitting the story.');
//         }
//     };

//     if (isLoading) {
//         return <LoadingSpinner />;
//     }

//     return (
//         <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
//             <div className="flex justify-center items-center flex-col">
//                 <h2 className="text-3xl text-center my-10 font-bold border-t-2 border-b-2 w-52 py-2">
//                     Guide profile
//                 </h2>
//             </div>
//             <div className="shadow-xl p-5">
//                 <div className="flex items-center justify-around mb-6">
//                     <img src={guide?.guideImage} className="w-32 h-32 rounded-full object-cover mr-6" alt="Guide" />
//                     <div>
//                         <h2 className="text-2xl font-semibold">{guide?.guideName}</h2>
//                         <p className="text-cyan-950">Email: {guide?.guideEmail}</p>
//                         <p className="text-cyan-950">Phone: {guide?.guidePhone}</p>
//                         <p className="text-cyan-950">Address: {guide?.guideAddress}</p>
//                         <p className="text-cyan-950">Degree: {guide?.degree}</p>
//                         <p className="text-cyan-950">Position: {guide?.position}</p>
//                         <p className="text-cyan-950">University: {guide?.university}</p>
//                         <p className="text-cyan-950">Year: {guide?.year}</p>
//                     </div>
//                 </div>
//                 <Reviews />
//             </div>

//             <div className="mt-8">
//                 <div className="flex justify-start items-center mb-4">
//                     <ReactStarsRating onChange={onChange} value={rating} />
//                 </div>
//                 <h3 className="text-xl font-semibold mb-4 mt-8">Add a Story</h3>
//                 <form onSubmit={handleSubmit}>
//                 <div className="flex justify-center items-center mb-4">
//                         <div className="w-1/2 p-2">
//                             <label className="block text-gray-700 mb-2">Tourist Name</label>
//                             <input
//                                 type="text"
//                                 value={user?.displayName || 'User name not found'}
//                                 readOnly
//                                 className="w-full p-2 border rounded-lg"
//                             />
//                         </div>
//                         <div className="w-1/2 p-2">
//                             <label className="block text-gray-700 mb-2">Tourist Email</label>
//                             <input
//                                 type="text"
//                                 value={user?.email}
//                                 readOnly
//                                 className="w-full p-2 border rounded-lg"
//                             />
//                         </div>
//                         <div className="w-1/2 p-2">
//                             <label className="block text-gray-700 mb-2">Tourist Image</label>
//                             <img
//                                 src={user?.photoURL}
//                                 alt="Tourist"
//                                 className="w-16 h-16 rounded-full"
//                             />
//                         </div>
//                     </div>
//                     <div className="mb-4">
//                         <label htmlFor="title" className="block text-gray-700 mb-2">Story Title</label>
//                         <input
//                             type="text"
//                             id="title"
//                             name="title"
//                             value={storyTitle}
//                             onChange={(e) => setStoryTitle(e.target.value)}
//                             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             required
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <label htmlFor="story" className="block text-gray-700 mb-2">Story</label>
//                         <textarea
//                             id="story"
//                             name="story"
//                             value={story}
//                             onChange={(e) => setStory(e.target.value)}
//                             rows="5"
//                             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             required
//                         ></textarea>
//                     </div>
                   
//                     <button
//                         type="submit"
//                         className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//                     >
//                         Submit
//                     </button>
//                 </form>
//             </div>
//             <ToastContainer />
//         </div>
//     );
// };

// export default GuideDetails;
import { useParams } from "react-router-dom";
import ReactStarsRating from 'react-awesome-stars-rating';
import { useState } from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "../../../Shared/Navbar/Loading/LoadingSpinner";
import useAuth from "../../../Hook/useAuth";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import GuideReviews from "./GuideReviews";

const GuideDetails = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const [rating, setRating] = useState(0);
    const [storyTitle, setStoryTitle] = useState("");
    const [story, setStory] = useState("");
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [page, setPage] = useState(1);

    const { data: guide = {}, isLoading: guideLoading } = useQuery({
        queryKey: ['guide', id],
        queryFn: async () => {
            const response = await axiosSecure.get(`/guides/${id}`);
            return response.data;
        }
    });

    const { data: reviewsData = { reviews: [], total: 0 }, isLoading: reviewsLoading } = useQuery({
        queryKey: ['reviews', id, page],
        queryFn: async () => {
            const response = await axiosSecure.get(`/reviews`, {
                params: { page, perPage: 10 }
            });
            return response.data;
        }
    });

    const onChange = (value) => {
        setRating(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const storyData = {
            guideId: id,
            guideName: guide?.guideName,
            guideEmail: guide?.guideEmail,
            rating,
            touristName: user?.displayName || 'User name not found',
            touristEmail: user?.email,
            touristImage: user?.photoURL,
            storyTitle,
            story
        };

        try {
            const response = await axiosSecure.post('/reviews', storyData);
            if (response.data.insertedId) {
                toast.success('Story submitted successfully!');
                setStoryTitle("");
                setStory("");
                queryClient.invalidateQueries(['reviews', id]);
            } else {
                toast.warning('Failed to submit story.');
            }
        } catch (error) {
            console.error("There was an error submitting the story:", error);
            toast.warning('An error occurred while submitting the story.');
        }
    };

    if (guideLoading || reviewsLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-center items-center flex-col">
                <h2 className="text-3xl text-center my-10 font-bold border-t-2 border-b-2 w-52 py-2">
                    Guide Profile
                </h2>
            </div>
            <div className="shadow-xl p-5">
                <div className="flex items-center justify-around mb-6">
                    <img src={guide?.guideImage} className="w-32 h-32 rounded-full object-cover mr-6" alt="Guide" />
                    <div>
                        <h2 className="text-2xl font-semibold">{guide?.guideName}</h2>
                        <p className="text-cyan-950">Email: {guide?.guideEmail}</p>
                        <p className="text-cyan-950">Phone: {guide?.guidePhone}</p>
                        <p className="text-cyan-950">Address: {guide?.guideAddress}</p>
                        <p className="text-cyan-950">Degree: {guide?.degree}</p>
                        <p className="text-cyan-950">Position: {guide?.position}</p>
                        <p className="text-cyan-950">University: {guide?.university}</p>
                        <p className="text-cyan-950">Year: {guide?.year}</p>
                    </div>
                </div>
                <GuideReviews reviews={reviewsData.reviews} />
                <div className="flex justify-between items-center mt-4">
                    <button
                        onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                        className="px-4 py-2 bg-gray-200 rounded-lg"
                    >
                        Previous
                    </button>
                    <span>Page {page}</span>
                    <button
                        onClick={() => setPage(prev => prev + 1)}
                        disabled={page * 10 >= reviewsData.total}
                        className="px-4 py-2 bg-gray-200 rounded-lg"
                    >
                        Next
                    </button>
                </div>
            </div>

            <div className="mt-8">
                
                    <div className="flex justify-center items-center">
                        <ReactStarsRating onChange={onChange} value={rating} className="text-yellow-500 flex " />
                    </div>
               
                <h3 className="text-xl font-semibold mb-4 mt-8">Add a Story</h3>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-wrap -mx-2 mb-4">
                        <div className="w-1/3 px-2 mb-4">
                            <label className="block text-gray-700 mb-2">Tourist Name</label>
                            <input
                                type="text"
                                value={user?.displayName || 'User name not found'}
                                readOnly
                                className="w-full p-2 border rounded-lg"
                            />
                        </div>
                        <div className="w-1/3 px-2 mb-4">
                            <label className="block text-gray-700 mb-2">Tourist Email</label>
                            <input
                                type="text"
                                value={user?.email}
                                readOnly
                                className="w-full p-2 border rounded-lg"
                            />
                        </div>
                        <div className="w-1/3 px-2 mb-4">
                            <label className="block text-gray-700 mb-2">Tourist Image</label>
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
                            value={storyTitle}
                            onChange={(e) => setStoryTitle(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="story" className="block text-gray-700 mb-2">Story</label>
                        <textarea
                            id="story"
                            name="story"
                            value={story}
                            onChange={(e) => setStory(e.target.value)}
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
            <ToastContainer />
        </div>
    );
};

export default GuideDetails;
