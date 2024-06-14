import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../../Shared/Navbar/SectionTitle";
import BookingPages from "../../MyBooking/BookingPages";
import GuideList from "./GuideList";


const TourDetails = () => {
    // const axiosSecure = useAxiosSecure();
    const tour = useLoaderData();

    const { photoUrls, tourType, title,guideName,
        description, heading, tourPlan, } = tour || {};

    if (!photoUrls || photoUrls.length === 0) {
        return <div>No images available for this tour.</div>;
    }



    return (
        <>
            <div className="py-20">
                <SectionTitle
                    subheading="Tour Details"
                    heading="All Details Here"
                ></SectionTitle>
                   <div>
                <div className="my-10 grid grid-cols-1 md:grid-col-2 gap-2  py-10  rounded-lg ">
                 
                    <div className="col-span-1 row-span-2  ">
                        <img src={photoUrls[0]} alt="Tour" className="w-full h-full  md:h-[408px] object-cover rounded-lg" />
                    </div>
                    {photoUrls.length > 2 && (
                        <div className="col-span-1 row-span-1">
                            <img src={photoUrls[1]} alt="Tour" className="w-full h-full  md:h-[200px] object-cover rounded-lg" />
                        </div>
                    )}
                    {photoUrls.length > 2 && (
                        <div className="col-span-1 row-span-1">
                            <img src={photoUrls[2]} alt="Tour" className="w-full h-full  md:h-[200px] object-cover rounded-lg" />
                        </div>
                    )}
                    <div className="col-span-1 md:col-span-2  p-4">
                        <h5>{heading}</h5>
                        <h2 className="text-3xl font-bold">{title}</h2>
                        <p>{description}</p>
                        <p className="text-xl text-gray-600">{tourType}</p>

                    </div>
                    </div>
                    <div className="flex justify-center  bg-base-200 p-10">
                        <div className="flex j w-full  gap-5">
                            <div className="flex-1 my-10  ">
                                <h2 className="text-2xl border-b-2  font-bold"> Our Price:</h2>
                                {
                                    tourPlan.map(plan => <div key={plan.name} className="my-5">
                                        <div className="flex py-3 text-lg  ">
                                            <div className="flex ">
                                                <p>Day {plan.day}:</p>
                                                <p> {plan.description}</p>
                                            </div>
                                            <p>Price: ${plan.price}</p>
                                        </div>
                                    </div>
                                    )}
                                <div>
                                   
                                    <GuideList></GuideList>
                                </div>
                            </div>
                            <div className="ml-10 bg-cyan-900">
                                <BookingPages
                                    tour={tour}
                                ></BookingPages>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TourDetails;
