import React from "react";
import { Link,useNavigate } from "react-router-dom";

export const Nav = () => {
  const navigate=useNavigate()
  const auth=localStorage.getItem('user')

  const logoutHandler=()=>{
    localStorage.clear()
    navigate('/signup')
  }
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
        {auth ? <li><Link to="/signup" onClick={logoutHandler}>Logout</Link></li>
        :<>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">SignUp</Link></li>
        </>}
        
      </ul>
    </div>
  );
};
