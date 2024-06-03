import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import 'react-tabs/style/react-tabs.css';
import TourList from "./TourList";

const TabTourist = () => {
    return (
        <Tabs>
            <TabList>
                <Tab>Overview</Tab>
                <Tab> Our Packages</Tab>
                <Tab>Meet Our Tour Guides</Tab>
            </TabList>
            <TabPanel>
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
                <h2>Meet Our Tour Guides</h2>
            </TabPanel>
        </Tabs>
    );
};

export default TabTourist;