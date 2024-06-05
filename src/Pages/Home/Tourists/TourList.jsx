import { useEffect, useState } from "react";
import TourCard from "./TourCard";
import { Link } from "react-router-dom";
import axios from "axios";

const TourList = () => {
    const [tours, setTours] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const { data } = await axios(`${import.meta.env.VITE_API_URL}/tours`)
            setTours(data.slice(0, 3));
        }
        getData()

        // fetch(`${import.meta.env.VITE_API_URL}/tours`)
        // // fetch('http://localhost:5000/tours')
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log('Fetched tours data:', data);
        //         setTours(data.slice(0, 3));
        //     })

    }, []);
    return (
        <div>
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
