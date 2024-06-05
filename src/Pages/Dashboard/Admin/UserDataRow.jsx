// import React, { useState } from 'react';
// import useAxiosSecure from "../../../Hook/useAxiosSecure";

// const UserDataRow = ({ user, refetch }) => {
//     const axiosSecure = useAxiosSecure();
//     const [buttonsDisabled, setButtonsDisabled] = useState(false);

//     const handleRoleChange = async (userId, newRole) => {
//         try {
//             await axiosSecure.put(`/users/${userId}/role`, { role: newRole });
//             refetch();
//             setButtonsDisabled(true);
//         } catch (error) {
//             console.error('Failed to update role', error);
//         }
//     };

//     return (
//         <tr key={user._id}>
//             <td className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
//                 {user.email}
//             </td>
//             <td className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
//                 {user.role}
//             </td>
//             <td className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
//                 {user.status}
//             </td>
//             <td className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
//                 <button
//                     className='bg-blue-500 text-white px-4 py-2 rounded-lg mr-2'
//                     onClick={() => handleRoleChange(user._id, 'Admin')}
//                     disabled={buttonsDisabled}
//                 >
//                     Make Admin
//                 </button>
//                 <button
//                     className='bg-green-500 text-white px-4 py-2 rounded-lg'
//                     onClick={() => handleRoleChange(user._id, 'Tour Guide')}
//                     disabled={buttonsDisabled}
//                 >
//                     Make Tour Guide
//                 </button>
//             </td>
//         </tr>
//     );
// };

// export default UserDataRow;
