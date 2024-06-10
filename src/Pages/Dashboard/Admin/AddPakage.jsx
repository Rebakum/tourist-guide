import { useState } from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const AddPakage = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [tourData, setTourData] = useState({
        photoUrls: ['', '', ''],
        tourType: '',
        title: '',
        heading: '',
        description: '',
        guideName: '',
        guideImage: '',
        guideEmail: '',
        tourPlan: [
            { day: 1, description: '', price: 0 },
            { day: 2, description: '', price: 0 },
            { day: 3, description: '', price: 0 }
        ]
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('photoUrl')) {
            const index = parseInt(name.split('-')[1]);
            const updatedPhotoUrls = [...tourData.photoUrls];
            updatedPhotoUrls[index] = value;
            setTourData({ ...tourData, photoUrls: updatedPhotoUrls });
        } else if (name.startsWith('tourPlan')) {
            const [_, index, field] = name.split('-');
            const updatedTourPlan = [...tourData.tourPlan];
            updatedTourPlan[parseInt(index)][field] = field === 'price' ? parseFloat(value) : value;
            setTourData({ ...tourData, tourPlan: updatedTourPlan });
        } else {
            setTourData({ ...tourData, [name]: value });
        }
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(tourData); // Handle the form submission

        try {
            const { data } = await axiosSecure.post(
                `${import.meta.env.VITE_API_URL}/tours`,
                tourData
            );
            console.log(data);
            toast.success('Tour Data Successfully Added!');
            navigate('/allPakages');
        } catch (err) {
            console.log('Oops, something went wrong:', err.message);
        }
    };

    return (
     <>
     <Helmet>
        <title> T & T || Add Pakage</title>
      </Helmet>
      <div className="hero min-h-screen bg-base-200">
            <div className="card shrink-0 w-full shadow-2xl bg-base-100">
            <div className="flex justify-center items-center flex-col">
                <h2 className="text-3xl text-center my-10 font-bold border-t-2 border-b-2 w-52 py-2">
                    Add Pakage
                </h2>
            </div>
                <form className="card-body" onSubmit={handleSubmit}>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo URLs</span>
                        </label>
                        <div className="flex space-x-2">
                            {tourData.photoUrls.map((url, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    placeholder="Photo URL"
                                    className="input input-bordered"
                                    name={`photoUrl-${index}`}
                                    value={url}
                                    onChange={handleChange}
                                    required
                                />
                            ))}
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Guide Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Email"
                            className="input input-bordered"
                            name="guideEmail"
                            value={tourData.guideEmail}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Guide Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Guide Name"
                            className="input input-bordered"
                            name="guideName"
                            value={tourData.guideName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Guide Image</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Photo URL"
                            className="input input-bordered"
                            name="guideImage"
                            value={tourData.guideImage}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Description"
                            className="input input-bordered"
                            name="description"
                            value={tourData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Title</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Title"
                            className="input input-bordered"
                            name="title"
                            value={tourData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Tour Type</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Tour Type"
                            className="input input-bordered"
                            name="tourType"
                            value={tourData.tourType}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Heading</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Heading"
                            className="input input-bordered"
                            name="heading"
                            value={tourData.heading}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Tour Plan</span>
                        </label>
                        {tourData.tourPlan.map((plan, index) => (
                            <div key={index} className="space-y-2">
                                <input
                                    type="number"
                                    placeholder="Day"
                                    className="input input-bordered"
                                    name={`tourPlan-${index}-day`}
                                    value={plan.day}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Description"
                                    className="input input-bordered"
                                    name={`tourPlan-${index}-description`}
                                    value={plan.description}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type="number"
                                    placeholder="Price"
                                    className="input input-bordered"
                                    name={`tourPlan-${index}-price`}
                                    value={plan.price}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        ))}
                    </div>

                    <div className="form-control mt-5">
                        <input
                            type="submit"
                            value="Submit"
                            className="input input-bordered w-full btn text-secondary btn-primary"
                        />
                    </div>
                </form>
            </div>
        </div>
     </>

       
    );
};

export default AddPakage;



// import { useState } from "react";
// import useAxiosSecure from "../../../Hook/useAxiosSecure";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const AddPakage = () => {
//     const axiosSecure = useAxiosSecure();
//     const navigate = useNavigate();
//     const [tourData, setTourData] = useState({
//         photoUrls: ['', '', ''],
//         tourType: '',
//         title: '',
//         heading: '',
//         description: '',
//         guideName: '',
//         guideImage: '',
//         guideEmail: '',
//         tourPlan: [
//             { day: 1, description: '', price: 0 },
//             { day: 2, description: '', price: 0 },
//             { day: 3, description: '', price: 0 }
//         ]
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         if (name.startsWith('photoUrl')) {
//             const index = parseInt(name.split('-')[1]);
//             const updatedPhotoUrls = [...tourData.photoUrls];
//             updatedPhotoUrls[index] = value;
//             setTourData({ ...tourData, photoUrls: updatedPhotoUrls });
//         } else if (name.startsWith('tourPlan')) {
//             const [_, index, field] = name.split('-');
//             const updatedTourPlan = [...tourData.tourPlan];
//             updatedTourPlan[parseInt(index)][field] = field === 'price' ? parseFloat(value) : value;
//             setTourData({ ...tourData, tourPlan: updatedTourPlan });
//         } else {
//             setTourData({ ...tourData, [name]: value });
//         }
//     };

//     const handleSubmit = async(e) => {
//         e.preventDefault();
//         console.log(tourData); // Handle the form submission

//         try {
//             const { data } = await axiosSecure.post(
//                 `${import.meta.env.VITE_API_URL}/tours`,
//                 tourData
//             );
//             console.log(data);
//             toast.success(' food Data Successfully!');
//             navigate('/tourisDetail');
//         } catch (err) {
//             console.log(err);
//             console.log('Oops, something went wrong:', err.message);
//         }
//     };

//     return (
//         <div className="hero min-h-screen bg-base-200">
//             <div className="card shrink-0 w-full shadow-2xl bg-base-100">
//                 <h2 className="text-3xl text-center my-10 "> Add Pakage</h2>
//                 <form className="card-body" onSubmit={handleSubmit}>

//                     <div className="form-control">
//                         <label className="label">
//                             <span className="label-text">Photo URLs</span>
//                         </label>
//                         <div className="flex space-x-2">
//                             {tourData.photoUrls.map((url, index) => (
//                                 <input
//                                     key={index}
//                                     type="text"
//                                     placeholder="Photo URL"
//                                     className="input input-bordered"
//                                     name={`photoUrl-${index}`}
//                                     value={url}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             ))}
//                         </div>
//                     </div>

//                     <div className="form-control">
//                         <label className="label">
//                             <span className="label-text">Guide Email</span>
//                         </label>
//                         <input
//                             type="email"
//                             placeholder="Email"
//                             className="input input-bordered"
//                             name="guideEmail"
//                             value={tourData.guideEmail}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>

//                     <div className="form-control">
//                         <label className="label">
//                             <span className="label-text">Guide Name</span>
//                         </label>
//                         <input
//                             type="text"
//                             placeholder="Guide Name"
//                             className="input input-bordered"
//                             name="guideName"
//                             value={tourData.guideName}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>

//                     <div className="form-control">
//                         <label className="label">
//                             <span className="label-text">Guide Image</span>
//                         </label>
//                         <input
//                             type="text"
//                             placeholder="Photo URL"
//                             className="input input-bordered"
//                             name="guideImage"
//                             value={tourData.guideImage}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>
//                     <div className="form-control">
//                         <label className="label">
//                             <span className="label-text">Description</span>
//                         </label>
//                         <input
//                             type="text"
//                             placeholder="description"
//                             className="input input-bordered"
//                             name="description"
//                             value={tourData.description}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>

//                     <div className="form-control">
//                         <input
//                             type="text"
//                             placeholder="Title"
//                             className="input input-bordered"
//                             name="title"
//                             value={tourData.title}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>

//                     <div className="form-control">
//                         <label className="label">
//                             <span className="label-text">Tour Type</span>
//                         </label>
//                         <input
//                             type="text"
//                             placeholder="Tour Type"
//                             className="input input-bordered"
//                             name="tourType"
//                             value={tourData.tourType}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>

//                     <div className="form-control">
//                         <label className="label">
//                             <span className="label-text">Heading</span>
//                         </label>
//                         <input
//                             type="text"
//                             placeholder="Heading"
//                             className="input input-bordered"
//                             name="heading"
//                             value={tourData.heading}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>

//                     <div className="form-control">
//                         <label className="label">
//                             <span className="label-text">Tour Plan</span>
//                         </label>
//                         {tourData.tourPlan.map((plan, index) => (
//                             <div key={index} className="space-y-2">
//                                 <input
//                                     type="number"
//                                     placeholder="Day"
//                                     className="input input-bordered"
//                                     name={`tourPlan-${index}-day`}
//                                     value={plan.day}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                                 <input
//                                     type="text"
//                                     placeholder="Description"
//                                     className="input input-bordered"
//                                     name={`tourPlan-${index}-description`}
//                                     value={plan.description}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                                 <input
//                                     type="number"
//                                     placeholder="Price"
//                                     className="input input-bordered"
//                                     name={`tourPlan-${index}-price`}
//                                     value={plan.price}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </div>
//                         ))}
//                     </div>

//                     <div className="form-control mt-5">
//                         <input
//                             type="submit"
//                             value="Submit"
//                             className="input input-bordered w-full btn text-secondary btn-primary"
//                         />
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default AddPakage;



// const AddPakage = () => {
//     const [tourData, setTourData] = useState({
//         photoUrls: ['', '', ''],
//         tourType: '',
//         title: '',
//         heading: '',
//         description: '',
//         guideName: '',
//         guideImage: '',
//         guideEmail: '',
//         tourPlan: [
//             { day: 1, description: '', price: 0 },
//             { day: 2, description: '', price: 0 },
//             { day: 3, description: '', price: 0 }
//         ]
//     });
//     return (
//         <div className="hero min-h-screen bg-base-200">


//             <div className="card shrink-0 w-full shadow-2xl bg-base-100">
//                 <form className="card-body">

//                     <div className="form-control">
//                         <label className="label">
//                             <span className="label-text">photoUrls</span>
//                         </label>
//                         <div className="flex">
//                         <input value=" photoUrls" type="text" placeholder="photoUrl" className="input input-bordered" required />
//                         <input value=" photoUrls" type="text" placeholder="photoUrl" className="input input-bordered" required />
//                         <input value=" photoUrls"  type="text"placeholder="photoUrl" className="input input-bordered" required />

                    
//                         </div>
//                     </div>

//                     <div className="form-control">
//                         <label className="label">
//                             <span className="label-text"> guideEmail</span>
//                         </label>
//                         <input type="email" placeholder="email" className="input input-bordered" required />
//                     </div>

//                     <div className="form-control">
//                         <label className="label">
//                             <span className="label-text">guideName</span>
//                         </label>
//                         <input type="text" placeholder="Guide Name" className="input input-bordered" required />
//                     </div>

//                     <div className="form-control">
//                         <label className="label">
//                             <span className="label-text"> guideImage</span>
//                         </label>
//                         <input type="text" placeholder="photoUrl" className="input input-bordered" required />

                       
//                     </div>

//                     <div className="form-control">
//                         <input type="text" placeholder="title" className="input input-bordered" required />
//                     </div>
//                     <div className="form-control">
//                         <label className="label">
//                             <span className="label-text"> tourType</span>
//                         </label>
//                         <input type="text" placeholder="tourType" className="input input-bordered" required />
//                     </div>
//                     <div className="form-control">
//                         <label className="label">
//                             <span className="label-text">heading</span>
//                         </label>
//                         <input type="text" placeholder="heading" className="input input-bordered" required />
                       
//                     </div>

//                     <div className="form-control">
//                         <label className="label">
//                             <span className="label-text">tourPlan</span>
//                         </label>
//                         <div>
//                             <input value="day"  type="text" placeholder="day" className="input input-bordered" required />

//                             <input value="description"  type="text" placeholder="description" className="input input-bordered" required />

//                             <input value="price"  type="number" placeholder="price" className="input input-bordered" required />
//                         </div>
//                         <div>
//                             <input value="day"  type="text" placeholder="day" className="input input-bordered" required />

//                             <input value="description"  type="text" placeholder="description" className="input input-bordered" required />

//                             <input value="price"  type="number" placeholder="price" className="input input-bordered" required />
//                         </div>
//                         <div>
//                             <input value="day"  type="text" placeholder="day" className="input input-bordered" required />

//                             <input value="description"  type="text" placeholder="description" className="input input-bordered" required />

//                             <input value="price" type="number" placeholder="price" className="input input-bordered" required />
//                         </div>
//                     </div>


//                     <div className=" w-full">
//                         <label className="form-control mt-5 ">
//                             <input type="submit" value="Submit" className="input input-bordered w-full btn text-secondary btn-primary " />
//                         </label>

//                     </div>
//                 </form>
//             </div>
//         </div>

//     );
// };

// export default AddPakage;