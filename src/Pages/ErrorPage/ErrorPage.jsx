import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-4 uppercase">no data!!!</h1>
            <Link to="/">
                <button className="px-4 py-2 bg-btn text-white rounded">Go back to home</button>
            </Link>
            <div className="relative flex justify-center items-center max-h-[330px] mt-4">
                <video
                    playsInline
                    loop
                    autoPlay
                    muted
                    className="max-w-[500px] min-w-[250px] max-h-[330px]"
                    style={{ width: '100%' }}
                >
                    <source src="https://cdnl.iconscout.com/lottie/premium/preview-watermark/error-page-3959266-3299965.mp4" type="video/mp4" />
                   
                </video>
            </div>
        </div>
    );
};

export default ErrorPage;
