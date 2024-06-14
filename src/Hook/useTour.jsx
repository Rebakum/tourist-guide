// import { useQuery } from "@tanstack/react-query";
// import useAuth from "./useAuth";
// import useAxiosSecure from "./useAxiosSecure";


// const useTour = () => {
//     const axiosSecure = useAxiosSecure();
//     const { user } = useAuth();

//     const { data: tourData = [], refetch } = useQuery({
//         queryKey: ['tourData', user?.email],
//         queryFn: async () => {
//             if (!user?.email) return [];
//             const res = await axiosSecure.get(`/wishLists?email=${user.email}`);
//             return res.data;
//         },
//         enabled: !!user?.email, // Only run query if user email is available
//     });

//     return [tourData, refetch];
// };

// export default useTour;
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useState } from "react";

const useTour = (page = 1, limit = 10) => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [currentPage, setCurrentPage] = useState(page);

    const { data: tourData = { wishLists: [], total: 0 }, isLoading, refetch } = useQuery({
        queryKey: ['tourData', user?.email, currentPage],
        queryFn: async () => {
            if (!user?.email) return { wishLists: [], total: 0 };
            try {
                const res = await axiosSecure.get(`/wishLists?email=${user.email}&page=${currentPage}&limit=${limit}`);
                console.log('API response:', res.data);
                return res.data;
            } catch (error) {
                console.error('Error fetching wishLists:', error);
                return { wishLists: [], total: 0 };
            }
        },
        enabled: !!user?.email,
    });

    return { tourData, isLoading, refetch, currentPage, setCurrentPage };
};

export default useTour;



