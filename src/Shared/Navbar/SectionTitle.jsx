

const SectionTitle = ({ subheading, heading, description }) => {
    return (

        <div className="my-20 mx- auto text-center flex justify-center items-center flex-col ">
            <h3 className="text-red-900">{subheading}</h3>
            <h1 className="text-4xl text-center  font-bold uppercase"> {heading}</h1>
            <p className="w-3/4 text-center">{description}</p>

        </div>


    );
};

export default SectionTitle;