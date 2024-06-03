import { Helmet } from "react-helmet";
import Bannar from "./Bannar";
import Tourist from "./Tourists/Tourist";


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>T&T || Home</title>
            </Helmet>
            <Bannar></Bannar>
            <Tourist></Tourist>
        </div>
    );
};

export default Home;