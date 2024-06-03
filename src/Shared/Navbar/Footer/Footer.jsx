import logo from '/logo.png'
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-cyan-950 opacity-80 text-white py-10">
            <div className="container mx-auto px-4">
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


// <footer className="footer p-10 bg-cyan-950  text-white ">
//     <aside>
//         <img className='size-24 rounded-full' src={logo} alt="" />
//         <p>Tourist guid.<br />Providing reliable tech since 1992</p>
//     </aside>
//     <nav>
//         <h6 className="footer-title">Services</h6>
//         <a className="link link-hover">Branding</a>
//         <a className="link link-hover">Design</a>
//         <a className="link link-hover">Marketing</a>
//         <a className="link link-hover">Advertisement</a>
//     </nav>
//     <nav>
//         <h6 className="footer-title">Company</h6>
//         <a className="link link-hover">About us</a>
//         <a className="link link-hover">Contact</a>
//         <a className="link link-hover">Jobs</a>
//         <a className="link link-hover">Press kit</a>
//     </nav>
//     <nav>
//         <h6 className="footer-title">Legal</h6>
//         <a className="link link-hover">Terms of use</a>
//         <a className="link link-hover">Privacy policy</a>
//         <a className="link link-hover">Cookie policy</a>
//     </nav>
// </footer>
//     );
// };

// export default Footer;