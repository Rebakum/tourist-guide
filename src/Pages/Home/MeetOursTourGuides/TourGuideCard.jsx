import { Link } from "react-router-dom";

const TourGuideCard = ({ guide }) => {
  const {guideName, guideImage, guideEmail, guideAdress, guidePhone, position, university, year, _id }= guide;
    console.log(guide)
    
    return (
      <div className="border rounded p-4 shadow-lg mb-4">
        <div className="flex items-center mb-4">
          <img
            className="w-20 h-20 rounded-full object-cover mr-4"
            src={guideImage}
            alt={guideImage}
          />
          <div>
            <h2 className="text-xl font-bold">{guideName}</h2>
            <p className="text-gray-600">{guideEmail}</p>
          </div>
        </div>
        <p>{position}</p>
        <Link state={guideEmail} to={`/dashboard/guideDetails/${_id}`}>
          <button  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
            Details
          </button>
        </Link>
      </div>
    );
  };
export default TourGuideCard;  