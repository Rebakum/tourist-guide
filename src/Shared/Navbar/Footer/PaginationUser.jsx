// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../../Hook/useAxiosSecure";
// import { useState } from "react";

// const PaginationUser = () => {
//     const [currentPage, setCurrentPage] = useState(1);
//     const axiosSecure = useAxiosSecure();
//     const { data: users = [], isLoading, error } = useQuery({
//         queryKey: ['users'],
//         queryFn: async () => {
//             const response = await axiosSecure.get('/users');
//             return response.data;
//         },
//     });

//     const recordsPerPage = 10;
//     const lastIndex = currentPage * recordsPerPage;
//     const firstIndex = lastIndex - recordsPerPage;
//     const records = users.slice(firstIndex, lastIndex);
//     const npage = Math.ceil(users.length / recordsPerPage);
//     const numbers = [...Array(npage + 1).keys()].slice(1);

//     const prePage = (event) => {
//         event.preventDefault();
//         if (currentPage > 1) {
//             setCurrentPage(currentPage - 1);
//         }
//     };

//     const changeCPage = (event, id) => {
//         event.preventDefault();
//         setCurrentPage(id);
//     };

//     const nextPage = (event) => {
//         event.preventDefault();
//         if (currentPage < npage) {
//             setCurrentPage(currentPage + 1);
//         }
//     };

//     if (isLoading) return <div>Loading...</div>;
//     if (error) return <div>Error: {error.message}</div>;

//     return (
//         <div className="overflow-x-auto p-6">
//             <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
//                 <thead className="bg-gray-800 text-white">
//                     <tr>
//                         <th className="py-3 px-6 text-left">#</th>
//                         <th className="py-3 px-6 text-left">Name</th>
//                         <th className="py-3 px-6 text-left">Email</th>
//                     </tr>
//                 </thead>
//                 <tbody className="text-gray-700">
//                     {records.map((user, i) => (
//                         <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-100">
//                             <td className="py-3 px-6">{firstIndex + i + 1}</td>
//                             <td className="py-3 px-6">{user.name}</td>
//                             <td className="py-3 px-6">{user.email}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//             <div className="flex items-center justify-between mt-4">
//                 <div className="text-sm text-gray-700">
//                     Showing {firstIndex + 1} to {Math.min(lastIndex, users.length)} of {users.length} users
//                 </div>
//                 <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
//                     <a
//                         href="#"
//                         onClick={prePage}
//                         className={`relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
//                     >
//                         <span>«</span>
//                     </a>
//                     {numbers.map((n) => (
//                         <a
//                             key={n}
//                             href="#"
//                             onClick={(event) => changeCPage(event, n)}
//                             className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${currentPage === n ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600' : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50'}`}
//                         >
//                             {n}
//                         </a>
//                     ))}
//                     <a
//                         href="#"
//                         onClick={nextPage}
//                         className={`relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md ${currentPage === npage ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
//                     >
//                         <span>»</span>
//                     </a>
//                 </nav>
//             </div>
//         </div>
//     );
// };

// export default PaginationUser;
