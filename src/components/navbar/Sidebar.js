import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import React from "react";
import Avatar from "./Avatar";

import DashboardIcon from "../../assets/dashboard_icon.svg";
import AddIcon from "../../assets/add_icon.svg";
import { useAuthContext } from "../../hooks/useAuthContext";
export default function Sidebar() {
  const { user } = useAuthContext();

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="user">
          <Avatar src={user.photoURL} />
          <p>Hey {user.displayName}</p>
        </div>
        <nav className="links">
          <ul>
           
              {user.uid !== "a5fl9Hs1aBcEdnT6QZtPE0gAa4d2" &&  <li> <NavLink exact to="/form2">
                <img src={AddIcon} alt="add project icon" />
                <span>Form1</span>
              </NavLink>  </li>}
           
            {/* <li> */}
            {/* <NavLink exact to="/profile">
                <img src={DashboardIcon} alt="dashboard icon" />
                <span>Profile</span>
                {console.log("DashboardIcon sidebar is working")}
              </NavLink>
            </li> */}
            <li>
             {user.uid !== "a5fl9Hs1aBcEdnT6QZtPE0gAa4d2" && <NavLink to="/form">
                <img src={AddIcon} alt="add project icon" />
                <span>Form2</span>
              </NavLink>}
            </li>
            <li>
              <NavLink to="/pending">
                <img src={AddIcon} alt="add project icon" />
                <span>Admin</span>
              </NavLink>
            </li>
            {/* <li>
              <NavLink to="/pay">
                <img src={AddIcon} alt="add project icon" />
                <span>Pay</span>
              </NavLink>
            </li> */}
          </ul>
        </nav>
      </div>
    </div>
  );
}
