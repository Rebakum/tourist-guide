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

const useTour = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: tourData = [], refetch } = useQuery({
        queryKey: ['tourData', user?.email],
        queryFn: async () => {
            if (!user?.email) return [];
            const res = await axiosSecure.get(`/wishLists?email=${user.email}`);
            return res.data;
        },
        enabled: !!user?.email, // Only run query if user email is available
    });

    return [tourData, refetch];
};

export default useTour;
