import SectionTitle from "../../../Shared/Navbar/SectionTitle"
import { tourtypes } from "./TourData"
import TourtypeBox from "./TourTypeBox"
import './TourType.css'

const TourType = () => {
    return (
        <>

            <SectionTitle
                subheading="T & T"
                heading="Touch TourType"

            ></SectionTitle>
            <div className="bg-Tour overflow-x-auto">
                <div className='pt-4 flex   items-center justify-between overflow-x-auto my-20'>
                    {tourtypes.map(item => (
                        <TourtypeBox key={item.label} label={item.label} icon={item.icon} />
                    ))}
                </div>
            </div>

        </>

    )
}

export default TourType