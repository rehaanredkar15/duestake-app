import React, { useState } from "react";
import "./DashboardComponent.css";
import Home from "../../../photos/dashboard/House.png";
import SignOut from "../../../photos/dashboard/SignOut.png";
import User from "../../../photos/dashboard/User.png";
import DashboardDetailsComponent from "../DashboardDetailsComponent/DashboardDetailsComponent";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import DashboardProfileComponent from "../DashboardProfileComponent/DashboardProfileComponent";

const DashboardComponent = () => {
  const [IsCurrentPage, setIsCurrentPage] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleOnClick = () => {
    setIsCurrentPage(true);
  };

  const handleOnClickProfile = () => {
    setIsCurrentPage(false);
  };
  return (
    <>
      <div className="DashboardComponentMainContainer">
        <div className="LeftSidebarContainer">
          <div className="DashboardSidebarMenuContainer">
            <div className="SidebarMenuContainer">
              <li
                className={IsCurrentPage ? "SidebarMenuContainerkeysCurrent" : "SidebarMenuContainerkeys"} 
                onClick={handleOnClick}
              >
                <img src={Home} alt="icon" className="IconSidebar" />
                Home
              </li>
              <li
             className={IsCurrentPage ? "SidebarMenuContainerkeys" : "SidebarMenuContainerkeysCurrent"} 
                onClick={handleOnClickProfile}
              >
                <img src={User} alt="icon" className="IconSidebar" />
                Profile
              </li>
            </div>
          </div>
        </div>
        <div className="MainDashboardContainer">
          {IsCurrentPage ? (
            <DashboardDetailsComponent />
          ) : (
            <DashboardProfileComponent />
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardComponent;
