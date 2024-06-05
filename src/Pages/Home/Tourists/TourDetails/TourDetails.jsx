import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../../Shared/Navbar/SectionTitle";
import BookingPages from "../../MyBooking/BookingPages";

const TourDetails = () => {
    const tour = useLoaderData();
    const { photoUrls, tourType,  title,
        description, heading, tourGuide, tourPlan, _id } = tour || {};

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
                <div className="my-10 grid grid-cols-1 md:grid-col-2 gap-2  py-10 border rounded-lg ">
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
                    <div className="flex justify-center w-full items-center gap-5 bg-red-300">
                        <div className="flex-1 flex-col ">
                            {
                                tourPlan.map(plan => <div key={plan.name}>
                                <div className="flex flex-col  bg-cyan-400">
                                        <div className="flex ">
                                            <p>Day- {plan.day}:</p>
                                            <p> {plan.description}</p>
                                        </div>
                                        <p>Price: ${plan.price}</p>
                                    </div>
                                </div>
                                )  }                       

                                <div>
                                {
                               tourGuide.map((guide,index)=>
                                    <div key={guide.name} >
                                        <p>{index+1} : {guide.name}</p>
                                    </div>
                                )
                            }
                                </div>                            
                        </div>
                        <div className="ml-10 bg-slate-500">
                        <BookingPages 
                        tour={tour}
                        
                        ></BookingPages>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TourDetails;
