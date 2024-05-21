import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
  AiOutlineDollarCircle,
} from "react-icons/ai";

import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoritesCount from "../Products/FavouritesCount";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const [dropdownOpen, setDropDownOpen] = useState(false);
  const [showSidebar] = useState(false);

  const toggleDropdown = () => {
    setDropDownOpen(!dropdownOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [LogoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await LogoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="navigation-container">
      <div className="navigation-links">
        <Link to="/" className="nav-link">
          <AiOutlineHome size={26} />
          <span className="nav-item-name">Home</span>
        </Link>

        <Link to="/shop" className="nav-link">
          <AiOutlineShopping size={26} />
          <span className="nav-item-name">Shop</span>
        </Link>

        <Link to="/Cart" className="nav-link">
          <AiOutlineShoppingCart size={26} />
          <span className="nav-item-name">Cart</span>
          {cartItems.length > 0 && (
            <span className="badge">
              {cartItems.reduce((a, c) => a + c.qty, 0)}
            </span>
          )}
        </Link>

        <Link to="/favourite" className="nav-link">
          <FaHeart size={26} />
          <span className="nav-item-name">Favourite</span>
          <FavoritesCount />
        </Link>

        <Link to="/sell" className="nav-link">
          <AiOutlineDollarCircle size={26} />
          <span className="nav-item-name">Sell</span>
        </Link>
      </div>

      <div className="user-section">
        {userInfo ? (
          <div className="dropdown">
            <button onClick={toggleDropdown} className="dropdown-toggle">
              <span className="username">{userInfo.username}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`dropdown-icon ${dropdownOpen ? "open" : ""}`}
                viewBox="0 0 24 24"
              >
                <path d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
              </svg>
            </button>
            {dropdownOpen && (
              <ul className="dropdown-menu">
                {userInfo.isAdmin ? (
                  <>
                    <li>
                      <Link to="/admin/categorylist">Category</Link>
                    </li>
                    <li>
                      <Link to="/admin/userlist">Users</Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/allproducts">Manage Products</Link>
                    </li>
                    <li>
                      <Link to="/manageOrders">Manage Orders</Link>
                    </li>
                  </>
                )}
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <button onClick={logoutHandler}>Logout</button>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <div className="auth-links">
            <Link to="/login" className="auth-link">
              <AiOutlineLogin size={26} />
              <span className="nav-item-name">LOGIN</span>
            </Link>
            <Link to="/register" className="auth-link">
              <AiOutlineUserAdd size={26} />
              <span className="nav-item-name">REGISTER</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navigation;
