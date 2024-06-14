// import PaginationUser from './PaginationUser';
import logo from '/logo.png'
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-cyan-950 opacity-80 mb-0 py-10">
            {/* <PaginationUser></PaginationUser>  */}
            <div className="container mx-auto text-white  px-4">
                <div className="flex flex-wrap justify-between">
                    <div className="w-full md:w-1/3 mb-4 md:mb-0">
                        <img className='size-24 rounded-full' src={logo} alt="" />
                        <h2 className="text-2xl font-bold mb-2">Tourist Guide</h2>
                        <p>Discover the best tourist spots and community activities with us. Your adventure begins here!</p>
                    </div>
                    <div className="w-full md:w-1/3 mb-4 md:mb-0">
                        <h2 className="text-xl font-bold mb-2">Quick Links</h2>
                        <ul>
                            <li className="mb-2"><NavLink to="/" className="hover:underline">Home</NavLink></li>
                            <li className="mb-2"><NavLink to="/community" className="hover:underline">Community</NavLink></li>
                            <li className="mb-2"><NavLink to="/blogs" className="hover:underline">Blogs</NavLink></li>
                            <li className="mb-2"><NavLink to="/about-us" className="hover:underline">About Us</NavLink></li>
                            <li className="mb-2"><NavLink to="/contact-us" className="hover:underline">Contact Us</NavLink></li>
                            <li className="mb-2"><NavLink to="/login" className="hover:underline">Login/Register</NavLink></li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/3 mb-4 md:mb-0">
                        <h2 className="text-xl font-bold mb-2">Contact Us</h2>
                        <p>Email: info@touristguide.com</p>
                        <p>Phone: +1 234 567 890</p>
                        <p>Address: 123 Adventure Lane, Travel City, World</p>
                    </div>
                </div>
                <div className="text-center mt-6">
                    <p>&copy; {new Date().getFullYear()} Tourist Guide. All Rights Reserved.</p>
                </div>
                
            </div>
        </footer>
    );
};

export default Footer;


