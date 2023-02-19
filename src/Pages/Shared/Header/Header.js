import userEvent from '@testing-library/user-event';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.svg'
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const Header = () => {
  const {user, logOutUser} = useContext(AuthContext)

  const handleLogout = () => {
    logOutUser().then(() => {

    })
    .catch(err => console.log(err))
  }
    const menuItems = <>
        <li className='font-semibold'><Link to='/'>Home</Link></li>
        <li className='font-semibold'><Link to='/orders'>Orders</Link></li>
        {/* <li className='font-semibold'><Link to='/login'>Login</Link></li> */}
        <li className='font-semibold'>
          {
            user?.uid? 
            <>
              {/* <span className='text-bold'>{user.displayName}</span> */}
              <button onClick = {handleLogout} className="btn btn-warning">Log Out</button> <span className=''>User: {user?.email}</span>
            </>
            :
            <>
              <Link to="/login"> Login</Link>
              <Link to="/signup"> Register</Link>
            </>
          }
        </li>
    </>
    return (
        <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              {menuItems}
            </ul>
          </div>
          <Link to="/"><img src={logo} alt=""/></Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {menuItems}
          </ul>
        </div>
        <div className="navbar-end">
         <button className="btn btn-warning">Appointment</button>
        </div>
      </div>
    );
};

export default Header;