import { useEffect, useState } from "react";
import AllPakesCard from "./AllPakagesCard/AllPakesCard";
import { Helmet } from "react-helmet";
import SectionTitle from "../../../Shared/Navbar/SectionTitle";


const AllPakages = () => {
    const [tours, setTours] = useState([]);

    useEffect(() => {
        const data = async () =>{
            const {data} = await axios
        }
        fetch(`${import.meta.env.VITE_API_URL}/tours`)
            // fetch('http://localhost:5000/tours')
            .then(res => res.json())
            .then(data => {
                console.log('Fetched tours data:', data);
                setTours(data);
            })

    }, [tours]);
    return (
        <>
            <div className="py-20">
                <SectionTitle
                    subheading="T&T is a specific category"
                    heading=" ALL pakages Tourism and Travel Guide"
                    description="Although many people think travel and tourism are synonymous with hospitality, that’s not quite the case. More accurately, T&T is a specific category within the hospitality industry."></SectionTitle>
            
            <div className="grid grid-cols-3 gap-5">
                {
                    tours.map(tour => <AllPakesCard key={tour._id} tour={tour}></AllPakesCard>

                    )
                }
            </div>
            </div>

        </>
    )
}

export default AllPakages;