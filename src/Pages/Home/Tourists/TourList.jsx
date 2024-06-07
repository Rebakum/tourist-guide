import { useEffect, useState } from "react";
import TourCard from "./TourCard";
import { Link } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import SectionTitle from "../../../Shared/Navbar/SectionTitle";

const TourList = () => {
    const [tours, setTours] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const { data } = await axios(`${import.meta.env.VITE_API_URL}/tours`)
            setTours(data.slice(0, 3));
        }
        getData()
    
    }, []);
    return (
        <div>
            <Helmet>
                <title>
                    T & T || Our Pakage
                </title>
            </Helmet>
            <SectionTitle
            subheading="T & T"
            heading="Our pakage"
            description="Explore breathtaking destinations with our all-inclusive tour package, featuring guided excursions, comfortable accommodations, and immersive cultural experiences."
            ></SectionTitle>
            <div className="grid lg:grid-cols-3 md:grid-cols-2  grid-cols-1 gap-5">
                {
                    tours.map(tour => <TourCard key={tour._id} tour={tour}></TourCard>)
                }
            </div>
            <Link
                to='/allPakages'
                className="flex justify-center items-center"
            >
                <button className="btn bg-btn my-20 "> All Packages</button>
            </Link>
        </div>
    )
}
export default TourList
