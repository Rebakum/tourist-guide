
import AllPakesCard from "./AllPakagesCard/AllPakesCard";
import { Helmet } from "react-helmet";
import SectionTitle from "../../../Shared/Navbar/SectionTitle";
import LoadingSpinner from "../../../Shared/Navbar/Loading/LoadingSpinner";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";


const AllPakages = () => {
    const axiosSecure = useAxiosSecure()
   
   
    

    
    const { data: tours = [], isLoading } = useQuery({
        queryKey: ['tours', ],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/tours');
            return data;
        },
    });

    if (isLoading) return <LoadingSpinner />;

    return (
        <div>
            <Helmet>
                <title>T & T || Our Package</title>
            </Helmet>
            <SectionTitle
                subheading="T & T"
                heading="Our Package"
                description="Explore breathtaking destinations with our all-inclusive tour package, featuring guided excursions, comfortable accommodations, and immersive cultural experiences."
            />
            {tours && tours.length > 0 ? (
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
                     {tours.map(tour => (
                        <AllPakesCard key={tour._id} tour={tour} />
                    ))}
                </div>
            ) : (
                <p>No tours found</p>
            )}
           
        </div>
    );
};

export default AllPakages;