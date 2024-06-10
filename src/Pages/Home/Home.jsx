import { Helmet } from "react-helmet";
import Bannar from "./Bannar";
import Tourist from "./Tourists/Tourist";
import ReviewStory from "./ReviewStory";
import TourType from "./TourType/TourType";




const Home = () => {
    return (
        <div>
            <Helmet>
                <title>T&T || Home</title>
            </Helmet>
            <Bannar></Bannar>
            <Tourist></Tourist>
            <TourType></TourType>
            <ReviewStory></ReviewStory>
        </div>
    );
};

export default Home;