import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/bundle";
import "./Bannar.css"
import { Autoplay, Navigation, Pagination } from "swiper/modules";



const Banner = () => {
    return (


        <div>

        <Swiper
            navigation={true}
            pagination={
                { clickable: true }
            }
            modules={[Navigation, Autoplay, Pagination]}
            autoplay={
                {
                    delay: 2500

                }
            }

            className="mySwiper"
            loop={true}>
            <SwiperSlide >
                <div className=" Slider slider1 flex text-center flex-col  text-white space-y-5 justify-center items-center ">
                    <h3 className="rancho text-2xl color">Explore the World's Largest Mangrove Forest</h3>
                    <h1 className="text-7xl rancho ">Sundarbans Adventure</h1>
                    <p className=" lg:w-1/2 text-center rancho text-xl ">Experience the true essence of farm-to-table dining with our seasonal menu.  Sourced directly from local farms, our ingredients are bursting with flavor and nutrients, delivering a wholesome and delicious dining experience.</p>

                    
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="Slider slider2 text-center  flex flex-col text-white space-y-5 justify-center items-center  ">
                    <h3 className="rancho text-2xl color">Discover the Rich Culture of Dhaka</h3>
                    <h1 className="text-7xl rancho ">Dhaka City Tour</h1>
                    <p className=" lg:w-1/2 text-center rancho text-xl ">Explore the vibrant capital city of Bangladesh, Dhaka. This tour takes you through the historical and cultural landmarks of the city, including the Lalbagh Fort, Ahsan Manzil, and the bustling streets of Old Dhaka.</p>
                    

                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="Slider slider3 flex  rancho text-2xl text-center flex-col text-white justify-center space-y-5 items-center">
                    <h3 className=" rancho text-2xl color">Relax at the Longest Sea Beach in the World</h3>
                    <h1 className="text-7xl rancho  ">Cox's Bazar Beach</h1>
                    <p className=" lg:w-1/2 text-center rancho text-xl ">"Cox's Bazar is renowned for its 120 km long sandy beach, making it the longest natural sea beach in the world. Enjoy a serene getaway with breathtaking views of the Bay of Bengal, luxury resorts, and local seafood delicacies.</p>

                    
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="Slider slider4 flex text-center flex-col  text-white space-y-5 justify-center items-center">
                    <h3 className="rancho text-2xl color">Experience the Pristine Beauty of Saint Martin Island</h3>
                    <h1 className="text-7xl rancho ">Saint Martin Island Getaway</h1>
                    <p className=" lg:w-1/2 text-center rancho text-xl ">Saint Martin Island, also known as Narikel Jinjira, is a small island in the northeastern part of the Bay of Bengal. This idyllic island is perfect for snorkeling, sunbathing, and exploring coral reefs and marine life.</p>
                    

                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="Slider slider5 flex text-center flex-col  text-white space-y-5 justify-center items-center">
                    <h3 className="rancho text-2xl color">Immerse Yourself in the Lush Greenery of Sylhet</h3>
                    <h1 className="text-7xl rancho ">Sylhet Tea Gardens Tour</h1>
                    <p className=" lg:w-1/2 text-center rancho text-xl ">Sylhet is famous for its picturesque tea gardens, lush green hills, and natural beauty. This tour offers a chance to visit the tea estates, explore the local culture, and enjoy the scenic landscapes of Sylhet..</p>
                    

                </div>
            </SwiperSlide>


        </Swiper>

    </div>
       
    );
};

export default Banner;






