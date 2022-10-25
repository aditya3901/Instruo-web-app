import { React, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.svg";

const NavBar = () => {
  const [isLoggedIn, setLoggedIn] = useState(true);
  return (
    <nav className="sticky top-[1rem] z-50 navbar bg-base-300 rounded-box bg-opacity-60 mt-[1rem] backdrop-blur transition-all duration-100 text-base-content shadow-sm w-11/12 mx-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow-sm bg-base-300 backdrop-blur rounded-box w-52 bg-opacity-80"
          >
            <li>
              <NavLink to="/sponsors">Sponsors</NavLink>
            </li>
            <li>
              <NavLink to="/events">Events</NavLink>
            </li>
            <li>
              <NavLink to="/workshops">Workshops</NavLink>
            </li>
            <li>
              <NavLink to="/contactus">Contact Us</NavLink>
            </li>
            <li>
              <NavLink to="/login">Log In</NavLink>
            </li>
            <li>
              <NavLink to="/signup">Register</NavLink>
            </li>
          </ul>
        </div>
        <NavLink to="/" className="btn btn-ghost normal-case text-xl">
          <img src={logo} className="max-w-sm mx-3" width="25" height="25" />
          Instruo
        </NavLink>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">
          <li>
            <a href="/#about">About</a>
          </li>

          <li>
            <NavLink to="/sponsors">Sponsors</NavLink>
          </li>
          <li>
            <NavLink to="/events">Events</NavLink>
          </li>
          <li>
            <NavLink to="/workshops">Workshops</NavLink>
          </li>
          <li>
            <NavLink to="/contactus">Contact Us</NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {isLoggedIn ? (
          <div className="dropdown dropdown-end mr-3">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="https://placeimg.com/80/80/people" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-300 bg-opacity-80 backdrop-blur rounded-box w-52"
            >
              <li>
                <NavLink to="/profile">Profile</NavLink>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        ) : (
          <div className="lg:flex mr-2">
            <NavLink
              to="/login"
              className="btn btn-sm lg:btn-md btn-outline btn-primary mx-2"
            >
              Log In
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
