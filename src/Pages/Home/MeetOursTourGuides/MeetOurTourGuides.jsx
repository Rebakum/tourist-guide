import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { Helmet } from "react-helmet";
import SectionTitle from "../../../Shared/Navbar/SectionTitle";
import TourGuideCard from "./TourGuideCard";


const MeetOurTourGuides = () => {
    const axiosSecure = useAxiosSecure();
    const { data: guides = [] } = useQuery({
        queryKey: ['guides'],
        queryFn: async () => {
            const respons = await axiosSecure.get('/guides');
            console.log(respons.data)
            return respons.data;
        }
    })
    return (
        <div>
            <Helmet>
                <title>
                    T & T || MEET OUR TOUR GUIDES
                </title>
            </Helmet>
            <SectionTitle
                subheading="T & T "
                heading="Meet Oure Tour Guide"
                description="A tour guide plays a crucial role in enhancing the travel experience by providing valuable insights, ensuring safety, and creating memorable moments for tourists. "
            ></SectionTitle>
            <div className="container mx-auto py-10">
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {guides.map((guide) => (
                        <TourGuideCard key={guide.id} guide={guide} />
                    ))}
                </div>
            </div>

        </div>
    );
};

export default MeetOurTourGuides;