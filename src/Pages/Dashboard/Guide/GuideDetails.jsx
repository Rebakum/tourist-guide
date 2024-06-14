import { useParams } from "react-router-dom";
import ReactStarsRating from 'react-awesome-stars-rating';
import { useState } from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import useAuth from "../../../Hook/useAuth";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import LoadingSpinner from './../../../Shared/Navbar/Loading/LoadingSpinner';
import { useQuery } from "@tanstack/react-query";


const GuideDetails = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const [rating, setRating] = useState(0);
    const axiosSecure = useAxiosSecure();

    // LOAD GUIDE INFORMATION HERE
    const { data: guideData, isLoading: isGuideLoading } = useQuery(
        {
            queryKey: ["guid data", { id }],
            queryFn: async () => {
                const result = await axiosSecure.get(`/guides/${id}`);
                return result.data;
            }

        });

    // LOAD COMMENTS
    const { data: allComment, isLoading: isCommentLoading } = useQuery({
        queryKey: ["all-comment", { email: guideData?.guideEmail }],
        queryFn: async () => {
            if (guideData?.guideEmail) {
                const result = await axiosSecure.get(`/all-comment/${guideData?.guideEmail}`);
                return result.data;
            }
            return [];
        }
    }
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const description = e.target.description.value;

        const reviewAllInfo = {
            guidEmail: guideData?.guideEmail,
            reviewer_Info: {
                userName: user?.displayName,
                userEmail: user?.email,
                userPhoto: user?.photoURL
            },
            review: {
                ratings: rating,
                title: title,
                description: description,
                date: new Date().toLocaleDateString()
            }
        }

        axiosSecure.post("/set-reviews", reviewAllInfo)
            .then(res => {
                if (res.data?.insertedId) {
                    toast.success("Review added successful")
                    e.target.reset();
                    setRating(0);
                }
            })
    }

    if (isGuideLoading || isCommentLoading) return <LoadingSpinner />;

    return (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-center items-center flex-col">
                <h2 className="text-3xl text-center my-10 font-bold border-t-2 border-b-2 w-52 py-2">
                    Guide Profile
                </h2>
            </div>
            <div className="shadow-xl p-5">
                <div className="flex items-center justify-around mb-6">
                    <img src={guideData?.guideImage} className="w-32 h-32 rounded-full object-cover mr-6" alt="Guide" />
                    <div>
                        <h2 className="text-2xl font-semibold"></h2>
                        <p className="text-cyan-950">Email: {guideData?.guideEmail}</p>
                        <p className="text-cyan-950">Phone: {guideData?.guidePhone}</p>
                        <p className="text-cyan-950">Address: {guideData?.guideAddress}</p>
                        <p className="text-cyan-950">Degree: {guideData?.degree}</p>
                        <p className="text-cyan-950">Position: {guideData?.position}</p>
                        <p className="text-cyan-950">University: {guideData?.university}</p>
                        <p className="text-cyan-950">Year: {guideData?.year}</p>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <div className="mb-4 space-y-2">
                            <h3 className="text-xl font-semibold mt-8">Give Review</h3>
                            <ReactStarsRating onChange={(newRating) => setRating(newRating)} value={rating} className="text-yellow-500 flex " />
                        </div>
                        <label htmlFor="title" className="block text-gray-700 mb-2">Review Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="story" className="block text-gray-700 mb-2">Review Description</label>
                        <textarea
                            id="story"
                            name="description"
                            rows="5"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        ></textarea>
                    </div>
                    <button
                        disabled={!user.email || !guideData?.guideEmail}
                        type="submit"
                        className="btn btn-success text-white"
                    >
                        Submit
                    </button>
                </form>
            </div>

            <div>
                <h3 className="text-4xl text-center font-semibold border-b">Other user Review</h3>
                <div>
                    {allComment.map(comment =>
                        <div key={comment.id} className="container flex flex-col w-full max-w-lg p-6 mx-auto divide-y rounded-md dark:divide-gray-300 dark:bg-gray-50 dark:text-gray-800">
                            <div className="flex justify-between p-4">
                                <div className="flex space-x-4">
                                    <div>
                                        <img src={comment?.reviewer_Info?.userPhoto} alt="" className="object-cover w-12 h-12 rounded-full dark:bg-gray-500" />
                                    </div>
                                    <div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default GuideDetails;
