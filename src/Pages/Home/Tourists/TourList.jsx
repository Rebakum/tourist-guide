import { useEffect, useState } from "react";
import TourCard from "./TourCard";
import { Link } from "react-router-dom";

const TourList = () => {
    const [tours, setTours] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/tours`)
        // fetch('http://localhost:5000/tours')
            .then(res => res.json())
            .then(data => {
                console.log('Fetched tours data:', data);
                setTours(data.slice(0, 3));
            })
            
    }, [tours]);
    return (
       <div>
         <div className="grid grid-cols-3 gap-5">
           {
            tours.map(tour=> <TourCard key={tour._id} tour={tour}></TourCard>)
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
