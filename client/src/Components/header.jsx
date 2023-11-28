import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaReact } from "react-icons/fa";
import logo from "../Logos/Home.svg";

function Header() {
  return (
    <header>
      <Link to="/" className="logo">
        <FaReact />
      </Link>

      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
    </header>
  );
}

export default Header;
