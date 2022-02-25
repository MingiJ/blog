import { Link } from "react-router-dom";
import "./navbar.css";
import person from "../person.jpg";

export default function Navbar() {
  return (
    <nav className="top">
      <div className="topLeft">
        <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>
        <i className="topIcon fab fa-pinterest-square"></i>
        <i className="topIcon fab fa-instagram-square"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link to="/ ">Home</Link>
          </li>
          <li className="topListItem">
            <Link to="/article-list">About</Link>
          </li>
          <li className="topListItem">
            <Link to="/about">Contact</Link>
          </li>
          <li className="topListItem">
            <Link to="/about">Write</Link>
          </li>
          <li className="topListItem">
            <Link to="/login">Login</Link>
          </li>
          <li className="topListItem">
            <Link to="/register">Register</Link>
          </li>
          <li className="topListItem">
            <Link to="/about">Logout</Link>
          </li>
        </ul>
      </div>
      <div className="topRight">
        <img className="topImage" src={person} alt="profile" />
        <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
      </div>
    </nav>
  );
}
