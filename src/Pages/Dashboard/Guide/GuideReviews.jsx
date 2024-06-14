const GuideReviews = ({ reviews }) => {
    return (
        <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Reviews</h3>
            {reviews.map((review, index) => (
                <div key={index} className="mb-4 p-4 border rounded-lg">
                    <h4 className="text-lg font-semibold">{review.storyTitle}</h4>
                    <p className="text-gray-700">{review.story}</p>
                    <div className="flex items-center mt-2">
                        <img
                            src={review.touristImage}
                            alt={review.touristName}
                            className="w-10 h-10 rounded-full mr-2"
                        />
                        <div>
                            <p className="text-sm font-semibold">{review.touristName}</p>
                            <p className="text-sm text-gray-600">{review.touristEmail}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GuideReviews;
