import { useEffect, useState } from "react";
import AllPakesCard from "./AllPakagesCard/AllPakesCard";
import { Helmet } from "react-helmet";
import SectionTitle from "../../../Shared/Navbar/SectionTitle";
import axios from "axios";


const AllPakages = () => {
    const [tours, setTours] = useState([]);

    useEffect(() => {
        const getData = async () =>{
            const {data} = await axios(`${import.meta.env.VITE_API_URL}/tours`)
            setTours(data);
        }
        getData()
       
       
            

    }, []);
    return (
        <>
        <Helmet>
            <title>
                T & T || ALL PAKAGE
            </title>
        </Helmet>
            <div className="py-20">
                <SectionTitle
                    subheading="T&T is a specific category"
                    heading=" ALL pakages Tourism and Travel Guide"
                    description="Although many people think travel and tourism are synonymous with hospitality, that’s not quite the case. More accurately, T&T is a specific category within the hospitality industry."></SectionTitle>
            
            <div className="grid lg:grid-cols-3 md:grid-cols-2  grid-cols-1 gap-5">
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