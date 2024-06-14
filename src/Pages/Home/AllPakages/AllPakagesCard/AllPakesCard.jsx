import { FaHeart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import useAuth from "../../../../Hook/useAuth";
import Swal from "sweetalert2";

const AllPakesCard = ({ tour }) => {
  const { photoUrls, tourType, title, guideName, guideImage, guideEmail, tourPlan, _id } = tour;
  const firstDayPackage = tourPlan[0];

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const navigate = useNavigate();

  const handleWishList = async () => {
    if (user && user.email) {
      const tourData = {
        email: user.email,
        tourId: _id,
        photoUrls,
        tourType,
        title,
        tourPlan
      };

      try {
        const response = await axiosSecure.post('wishLists', tourData);
        if (response.status === 200) {
          Swal.fire({
            title: "Added to Wishlist",
            text: `${title} has been added to your wishlist!`,
            icon: "success",
            confirmButtonText: "Ok"
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Failed to add to wishlist. Please try again later.",
          icon: "error",
          confirmButtonText: "Ok"
        });
      }
    } else {
      Swal.fire({
        title: "You are not logged in",
        text: "Please log in to add to wishlist!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, login!"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login', { state: { from: location } });
        }
      });
    }
  };

  return (
    <div className="relative max-w-sm overflow-hidden shadow-lg p-6 rounded-2xl m-4 transition-transform transform hover:scale-105 duration-300">
      <div className="relative">
        <img className="w-full h-60 rounded-2xl object-cover" src={photoUrls[0]} alt={title} />
        <FaHeart
          onClick={handleWishList}
          className="absolute top-2 right-2 text-red-500 text-2xl z-10 cursor-pointer hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="px-6 py-4">
        <p className="font-bold text-2xl mb-2">{title}</p>
        <p className="text-gray-700 text-base mb-4">{tourType}</p>
        <div className="flex items-center mb-4">
          <img className="w-12 h-12 rounded-full mr-4" src={guideImage} alt="Guide" />
          <div>
            <p className="text-lg font-semibold">{guideName}</p>
            <p className="text-sm text-gray-600">{guideEmail}</p>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">Day 1 Package:</h3>
          <p className="text-gray-800 mb-1">{firstDayPackage.description}</p>
          <p className="text-gray-800 font-semibold">Price: ${firstDayPackage.price}</p>
        </div>
      </div>
      <div className="text-center mt-4">
        <Link to={`/tourisDetail/${tour._id}`}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300">
            View Package
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AllPakesCard;
