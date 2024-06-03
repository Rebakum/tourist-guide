import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '/logo.png';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const Navbar = () => {
   
const{user, logOut} = useContext(AuthContext)
    const navLinks = (
        <>
            <li><NavLink to="/" className="text-white" activeClassName="font-bold ">Home</NavLink></li>
            <li><NavLink to="/community" className="text-white" activeClassName="font-bold ">Community</NavLink></li>
            <li><NavLink to="/blogs" className="text-white" activeClassName="font-bold ">Blogs</NavLink></li>
            <li><NavLink to="/about-us" className="text-white" activeClassName="font-bold ">About Us</NavLink></li>
            <li><NavLink to="/contact-us" className="text-white" activeClassName="font-bold ">Contact Us</NavLink></li>
            
        </>
    );

    return (
        <div className="navbar bg-cyan-950 opacity-80 top-0 poppins h-20 fixed z-10 max-w-7xl">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="rounded-full lg:hidden ">
                        <img className='size-16 rounded-full' src={logo} alt="Logo" />
                    </div>
                    <ul tabIndex={0} className="menu menu-sm  dropdown-content mt-3 z-[1] p-2 shadow bg-cyan-950 rounded-box w-52">
                        {navLinks}
                    </ul>
                </div>
                <img className=' size-16 hidden lg:block rounded-full' src={logo} alt="Logo" />
                <a className="ml-2 hidden lg:block color text-4xl rancho  font-bold">T&T</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end flex items-center space-x-4">
            {
              user ?
                <div>
                  <div className="dropdown dropdown-end ">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                      <div className="w-10 rounded-full" data-tooltip-id="my-tooltip">
                        <img src={user?.photoURL || "https://as1.ftcdn.net/v2/jpg/06/17/13/26/1000_F_617132669_YptvM7fIuczaUbYYpMe3VTLimwZwzlWf.webp"} />
                      </div>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-5 shadow   rounded-box bg-cyan-400 w-52">
                      <li className="text-slate-950">
                      {user?.displayName || 'user name not found'}
                      </li>
                      <li className="text-slate-950 my-2">
                        {user?.email}
                      </li>
                    
                      <Link to="/dashboard" >
                      <li  className="font-bold text-xl"> Dashboard</li>
                      </Link>

                      <li>
                        <button
                          onClick={logOut}
                          className="btn btn-sm  btn-ghost">Logout</button>

                      </li>
                    </ul>
                  </div>                 
                </div>
                :
                <div>
                  <Link to="/signUp" className=' btn btn-ghost text-lg font-bold  color' >SigUp</Link>
                  <Link to="/login" className=' btn btn-ghost text-lg font-bold  color' >Login</Link>
                </div>
            }

            </div>
        </div>
    );
};

export default Navbar;
