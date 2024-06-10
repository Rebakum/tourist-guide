import { TbBeach, TbMountain, TbPool } from 'react-icons/tb'
import {
 
  GiWindmill,
} from 'react-icons/gi'

import { MdOutlineVilla } from 'react-icons/md'

export const tourtypes = [
  {
    label: 'Nature',
    icon: TbBeach,
   
  },
  {
    label: 'Relaxation',
    icon: GiWindmill,
  
  },
  {
    label: 'Historical',
    icon: MdOutlineVilla,
   
  },
  {
    label: 'Cultural',
    icon: TbMountain,
   
  },
  {
    label: 'Advanture',
    icon: TbPool,
   
  },
 
]



// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../../Hook/useAxiosSecure";

// import { Helmet } from "react-helmet";
// import SectionTitle from "../../../Shared/Navbar/SectionTitle";
// import { useState, useEffect } from "react";


// const TourType = () => {
//     const axiosSecure = useAxiosSecure();
//     const [limitedTours, setLimitedTours] = useState([]);

//     const { data: tours = []} = useQuery({
//         queryKey: ['tours'],
//         queryFn: async () => {
//             const response = await axiosSecure.get('/tours');
//             console.log("tours", response.data);
//             return response.data;
//         },
//         onSuccess: (data) => {
//             setLimitedTours(data.slice(0, 5)); // Limit the displayed tours to 5
//         }
//     });

//     useEffect(() => {
//         setLimitedTours(tours.slice(0, 5));
//     }, [tours]);

//     const Nature = tours.filter(item => item.tourType === 'Nature');
//     const Relaxation = tours.filter(item => item.tourType === 'Relaxation');
//     const Historical = tours.filter(item => item.tourType === 'Historical');
//     const Adventure = tours.filter(item => item.tourType === 'Adventure');
//     const Cultural = tours.filter(item => item.tourType === 'Cultural');

   

//     return (
//         <>
//             <Helmet>
//                 <title>T & T || TOURTYPE</title>
//             </Helmet>
//             <SectionTitle
//                 subheading="T & T"
//                 heading="Tour Type"
//                 description="Explore breathtaking destinations with our all-inclusive tour package, featuring guided excursions, comfortable accommodations, and immersive cultural experiences."
//             />
//             <div onClick={()=>console.log(tour)}
//             className="grid lg:grid-cols-5 md:grid-cols-2 grid-cols-1 gap-4">
//                 {limitedTours.map(tour => (
//                     <div key={tour._id} className="p-4 border rounded-lg">
//                         <div>
//                             <img className="w-full h-40 object-cover rounded-lg" src={tour?.photoUrls[1] } alt={tour.tourType} />
//                         </div>
//                         <p className="mt-2 text-center">{tour.tourType}</p>
//                     </div>
//                 ))}
//             </div>
//         </>
//     );
// };

// export default TourType;
