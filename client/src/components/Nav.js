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
    <img src='https://img.freepik.com/free-vector/seasonal-sale-discounts-presents-purchase-visiting-boutiques-luxury-shopping-price-reduction-promotional-coupons-special-holiday-offers-vector-isolated-concept-metaphor-illustration_335657-2766.jpg?w=2000' alt='logo' className="logo"/>     
     {auth? <ul className="nav-ul">
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
        <li><Link to="/signup" onClick={logoutHandler}>Logout</Link>
        </li> 
      </ul>
       : <ul className="nav-ul nav-right">
      <li><Link to="/login">Login</Link></li>
      <li><Link to="/signup">SignUp</Link></li>
      </ul>
}
    </div>
  );
};

