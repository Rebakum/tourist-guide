


const TourCard = ({ tour }) => {
  const {photoUrls, tourType, price, title} = tour;
  return (
    <div className="max-w-sm  overflow-hidden shadow-lg p-5 rounded-2xl m-4">
      <img className="w-full h-60 rounded-2xl" src={photoUrls[0]} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{tourType}</p>
        <p className="text-gray-700 text-base">${price}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <button className="bg-btn hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          View Package
        </button>
      </div>
    </div>
  );
};
export default TourCard;


