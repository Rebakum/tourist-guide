import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import useAuth from '../../../Hook/useAuth';
import LoadingSpinner from '../../../Shared/Navbar/Loading/LoadingSpinner';

const Reviews = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: reviews = [], isLoading, error, refetch } = useQuery({
        queryKey: ['reviews', user?.email],
        queryFn: async () => {
            try {
                const response = await axiosSecure.get('/reviews', {
                    params: { email: user.email }
                });
                console.log("Fetched reviews:", response.data);
                return response.data;
            } catch (err) {
                console.error("Error fetching reviews:", err);
                throw err;
            }
        }
    });

    if (isLoading) {
        return <div><LoadingSpinner></LoadingSpinner></div>;
    }


    return (
        <div>
            {reviews.map(review => (
                <div key={review._id} className="review-card">
                    <p className='text-xl '>Rating: {review.rating}</p>

                    <div className="flex justify-between items-center">
                        <p>{review.story}</p>

                        <div className='flex justify-center flex-col items-center'>
                            <img src={review.touristImage} alt="Tourist" className="size-10 rounded-full" />
                            <span>{review.touristName}</span>

                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Reviews;
