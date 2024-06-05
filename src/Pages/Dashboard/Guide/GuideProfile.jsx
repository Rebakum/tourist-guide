

const GuideProfile = () => {
    return (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center">
            <img src="path-to-user-image.jpg" alt="User Image" className="w-32 h-32 rounded-full object-cover mr-6" />
            <div>
                <h2 className="text-2xl font-semibold">User Name</h2>
                <p className="text-gray-600">Email: user@example.com</p>
                <p className="text-gray-600">Location: City, Country</p>
            </div>
        </div>

        <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Add a Story</h3>
            <form action="/submit-story" method="POST">
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 mb-2">Story Title</label>
                    <input type="text" id="title" name="title" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="story" className="block text-gray-700 mb-2">Story</label>
                    <textarea id="story" name="story" rows="5" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required></textarea>
                </div>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Submit</button>
            </form>
        </div>
    </div>
    );
};

export default GuideProfile;