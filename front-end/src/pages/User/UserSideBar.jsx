import { Link, useLocation } from "react-router-dom";
import userAvatar from "../../assets/images/accountSetting/UserProfile.jpg";
import "../../assets/styles/sidebar.css";
import setting from "../../assets/images/accountSetting/setting.png";
import order from "../../assets/images/accountSetting/Order.png";
import logout from "../../assets/images/accountSetting/Logout.png";
export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <p className="welcome-text">Welcome Back!</p>
        <img src={userAvatar} alt="user avatar" className="user-avatar" />
        <h3 className="username">user name</h3>
      </div>

      <div className="sidebar-menu">x
        <ul>
          <li
            className={
              location.pathname === "user/account-settings" ? "active" : ""
            }
          >
            <Link to="/user/account-settings">
              <span className="vector">
                <img src={setting} alt="setting" />
              </span>
              Account Settings
            </Link>
          </li>
          <li className={location.pathname === "user/orders" ? "active" : ""}>
            <Link to="/user/orders">
              <span className=" vector">
                <img src={order} alt="order" />
              </span>
              My Orders
            </Link>
          </li>
        </ul>
      </div>

      <div className="sidebar-bottom">
        <span className=" vector">
          <img src={logout} alt="logout" />
        </span>
        <button>Log out</button>
      </div>
    </div>
  );
}

