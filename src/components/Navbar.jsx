import React from "react";

const Navbar = () => (
  <div className="navbar bg-base-100 shadow-md font-sans">
    <div className="container mx-auto px-4">
      <div className="navbar-start">
        <a className="text-2xl font-extrabold text-primary tracking-tight">MyBrand</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-lg">
          <li><a className="hover:text-primary-focus transition" href="#">Home</a></li>
          <li><a className="hover:text-primary-focus transition" href="#about">About</a></li>
          <li><a className="hover:text-primary-focus transition" href="#contact">Contact</a></li>
        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn btn-primary btn-sm hidden lg:inline-flex" href="#contact">Contattaci</a>
        <div className="dropdown dropdown-end lg:hidden">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><a href="#">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a className="btn btn-primary btn-sm mt-2" href="#contact">Contattaci</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default Navbar; 