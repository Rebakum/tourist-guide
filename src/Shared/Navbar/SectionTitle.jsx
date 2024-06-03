

const SectionTitle = ({ subheading, heading, description }) => {
    return (

        <div className="my-20 mx- auto text-center flex justify-center items-center flex-col ">
            <h3 className="text-orange-400">{subheading}</h3>
            <h1 className="text-4xl text-center color font-bold uppercase"> {heading}</h1>
            <p className="w-3/4 text-center">{description}</p>

        </div>


    );
};

export default SectionTitle;