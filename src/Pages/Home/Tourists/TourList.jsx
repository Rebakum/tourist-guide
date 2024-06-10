import { Link, useLocation } from "react-router-dom"; // Changed import
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../Shared/Navbar/Loading/LoadingSpinner";
import { Helmet } from "react-helmet";
import SectionTitle from "../../../Shared/Navbar/SectionTitle";
import TourCard from "./TourCard";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const TourList = () => {
    const axiosSecure = useAxiosSecure()
    const location = useLocation(); // Changed to useLocation hook
    const searchParams = new URLSearchParams(location.search);
    const tourType = searchParams.get('tourType');

    console.log(tourType);
    
    const { data: tours = [], isLoading } = useQuery({
        queryKey: ['tours', tourType],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/tours${tourType ? `?tourType=${tourType}` : ''}`);
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
                     {tours.slice(0, 3).map(tour => (
                        <TourCard key={tour._id} tour={tour} />
                    ))}
                </div>
            ) : (
                <p>No tours found</p>
            )}
            <Link to='/allPackages' className="flex justify-center items-center">
                <button className="btn bg-btn my-20">All Packages</button>
            </Link>
        </div>
    );
};

export default TourList;
