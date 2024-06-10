import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import 'react-tabs/style/react-tabs.css';
import TourList from "./TourList";
import MeetOurTourGuides from "../MeetOursTourGuides/MeetOurTourGuides";
import SectionTitle from "../../../Shared/Navbar/SectionTitle";

const TabTourist = () => {
    return (
        <Tabs>
            <TabList>
                <Tab>Overview</Tab>
                <Tab> Our Packages</Tab>
                <Tab>Meet Our Tour Guides</Tab>
            </TabList>
            <TabPanel>
                <SectionTitle
                subheading="T & T"
                heading="Our OverView"
                description="Discover unforgettable journeys with our curated travel packages, offering expert guides, top-notch accommodations, and enriching cultural adventures."
                ></SectionTitle>
                <iframe
                    width="100%"
                    height="498"
                    src="https://www.youtube.com/embed/Qq4pFcHBhis"
                    title="Top 10 Places to Visit in Bangladesh | Travel Video (4K)"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen>
                </iframe>
                
            </TabPanel>
            <TabPanel>
                <TourList></TourList>
            </TabPanel>
            <TabPanel>
                <MeetOurTourGuides></MeetOurTourGuides>
            </TabPanel>
        </Tabs>
    );
};

export default TabTourist;