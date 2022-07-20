import React, { useContext } from "react";

import { Link } from "react-router-dom";

import { AuthContext } from "./PathNav";

import "./css/Navbar.css";

export default function Navbar() {
  const auth = useContext(AuthContext);

  return (
    <nav className="navbar container-fluid">
      <img
        className="navbar-brand mx-auto rounded-3"
        src="/Logo.png"
        width="200"
        height="100"
        alt="Logo"
      />
      <ul className="w-100 navbar-nav d-flex flex-wrap justify-content-around">
        <SingleNav
          to="/byproducts"
          icon="fa-bag-shopping"
          title="Shop By Products"
        />
        <SingleNav to="/bystores" icon="fa-store" title="Shop By Stores" />
        {auth.authRole === "user" ? (
          <React.Fragment>
            <li
              className="nav-link rounded form-control-lg"
              onClick={() => {
                document.cookie = "id=;max-age=0";
                localStorage.setItem("role", "");
                auth.setAuthRole("");
              }}
            >
              <i className="pe-none fa-solid fa-right-from-bracket me-1" />
              Logout
            </li>

            <SingleNav to="/settings" icon="fa-gear" title="Dashboard" />
            <SingleNav to="/addproduct" icon="fa-plus" title="Add Product" />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <SingleNav to="/login" icon="fa-right-to-bracket" title="Login" />
            <SingleNav to="/signup" icon="fa-user-plus" title="Signup" />
          </React.Fragment>
        )}
      </ul>
    </nav>
  );
}

const SingleNav = (props) => {
  return (
    <Link to={props.to} className="form-control-lg">
      <li className="nav-link rounded">
        <i className={`fa-solid ${props.icon} me-1`} />
        {props.title}
      </li>
    </Link>
  );
};
