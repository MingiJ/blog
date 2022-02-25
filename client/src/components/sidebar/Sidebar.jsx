import "./sidebar.css";
import person from "../person.jpg";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Sidebar() {
  const [categories, setCategories] = useState([]);

  useEffect(()=>{
    const getCats = async ()=>{
      const res = await axios.get("/categories")
      setCategories(res.data)
    }
    getCats()
  })
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">About Me</span>
        <img className="sidebarImg" src={person} alt="" />
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea, eum aut.
          Sed tempore dolore aut impedit iste quisquam odit placeat esse
          voluptatum facere blanditiis distinctio, illum ipsum magni debitis
          dignissimos!
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">Categories</span>
        <ul className="sidebarList">
          {
            categories.map(category =>(
              <li className="sidebarlistItems">{category.name}</li>
            ))
          }
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">Follow Us</span>
        <div className="sidebarSocial">
          <div className="topLeft">
            <i className="sidebarIcon topIcon fab fa-facebook-square"></i>
            <i className="sidebarIcon topIcon fab fa-twitter-square"></i>
            <i className="sidebarIcon topIcon fab fa-pinterest-square"></i>
            <i className="sidebarIcon topIcon fab fa-instagram-square"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
