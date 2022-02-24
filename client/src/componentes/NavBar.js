import React from "react";
//The Link module will allow us to do routing
import { Link } from "react-router-dom";
import { IoCarSportOutline } from "react-icons/io5";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      {/* To style our component we use bootstrap*/}
      <div className="container">
        {/* The Link takes us to the initial route*/}
        <Link className="navbar-brand display-4" to="/">
          <IoCarSportOutline />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              {/* The Link takes us to the initial route*/}
              <Link className="nav-link" to="/">
                New Collection
              </Link>
            </li>
            <li className="nav-item">
              {/* The Link takes us to the CreateProduct route*/}
              <Link className="nav-link" to="/CreateProduct">
                Create Product
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
