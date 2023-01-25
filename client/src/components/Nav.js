import React from "react";
import { Link } from "react-router-dom";

export const Nav = () => {
  const auth=localStorage.getItem('user')
  return (
    <div style={{backgroundColor:'skyblue'}} >
      <ul className="nav-ul">
        <li>
          <Link to="/">Products</Link>
        </li>
        <li>
          <Link to="/add">Add Product</Link>
        </li>
        <li>
          <Link to="/update">Update Product</Link>
        </li>
        
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          {auth?<Link to="/logout">Logout</Link>
          :<Link to="/signup">SignUp</Link>}
        </li>
      </ul>
    </div>
  );
};
