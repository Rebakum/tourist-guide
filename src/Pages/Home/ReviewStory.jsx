
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Shared/Navbar/Loading/LoadingSpinner";


const ReviewStory = () => {
    const axiosSecure = useAxiosSecure();

    const { data: reviewsStory, isLoading, error, refetch } = useQuery({
        queryKey: ['reviewsStory'],
        queryFn: async () => {
            const response = await axiosSecure.get('/reviewsStory');
            return response.data;
        }
    });
    if (isLoading) return <div> <LoadingSpinner /></div>;
    return (


        <section className="my-20">
            <h1 className="text-7xl rancho text-center ">Our Happy Client <br /><span className="text-orange-700">Reviews</span></h1>

            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">

                {
                    reviewsStory?.map(review => <SwiperSlide
                        key={review._id}

                    >
                        <div className="my-16 mx-24  text-center  flex items-center flex-col space-y-5">

                            <img className='size-52 rounded-full' src={review.image} alt="" />
                            <Rating
                                style={{ maxWidth: 180 }}
                                value={review.rating}
                                readOnly
                            />
                            <p>{review.details}</p>
                            <h3 className="text-2xl text-orange-400">{review.name}</h3>
                        </div>
                    </SwiperSlide>)
                }

            </Swiper>
        </section>

    );
};

export default ReviewStory;