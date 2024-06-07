import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const GuideList = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { data: guides = [] } = useQuery({
        queryKey: ['guides'],
        queryFn: async () => {
            const response = await axiosSecure.get('/guides');
            console.log(response.data);
            return response.data;
        }
    });

    return (
        <div className="overflow-x-auto">
            <h2 className="text-center text-2xl font-bold">Our Guide List</h2>
            <table className="table">
                {/* head */}
                <thead className="text-xl font-bold bg-cyan-900 text-white">
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Experience</th>
                    </tr>
                </thead>
                <tbody className="bg-cyan-200">
                    {guides.map((guide, index) => (
                        <tr 
                            key={guide._id}
                            onClick={() => navigate(`/dashboard/guideProfile/${guide._id}`)}
                            className="cursor-pointer"
                        >
                            <th>{index + 1}</th>
                            <td>{guide.guideName}</td>
                            <td>{guide.year} years</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GuideList;
