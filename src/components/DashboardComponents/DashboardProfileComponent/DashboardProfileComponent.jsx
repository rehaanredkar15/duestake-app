import React from "react";
import "./DashboardProfileComponent.css";
import { RxCounterClockwiseClock } from "react-icons/rx";
import {
  GrShield,
  GrCertificate,
  GrHome,
  GrCircleQuestion,
} from "react-icons/gr";

const DashboardProfileComponent = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <div className="ProfileComponentContainer">
        <div className="ProfileComponentTopSection">
          <div className="ProfileComponentDetails">
            <span className="ProfileComponentTitle">Your Profile</span>
            <div className="ProfileComponentDetailsCard">
              <span className="ProfileSectionName">{user.userFullName}</span>
              <span className="ProfileSectionName">{user.userContactNo}</span>
              <span className="ProfileSectionName">{user.userEmail}</span>
            </div>
          </div>
          <div className="ProfileComponentStatistics">
            <span className="ProfileComponentTitle">Statistics</span>
            <div className="StatisticsCardContainer">
              <div className="StatisticsCard">
                <span className="StaticalNumber">85</span>
                <span className="StatiscalData">Total Loans</span>
              </div>
              <div className="StatisticsCard">
                <span className="StaticalNumber">82</span>
                <span className="StatiscalData">Pending Loans</span>
              </div>
            </div>
          </div>
        </div>
        <div className="ProfileComponentBottomSection">
          <span className="ProfileComponentTitle">Settings</span>
          <div className="SettingsOptions">
            <div className="settingsCard">
              <RxCounterClockwiseClock />
              <span className="Settingtitle">History</span>
            </div>
            <div className="settingsCard">
              <GrHome />
              <span className="Settingtitle">Bank Details</span>
            </div>
            <div className="settingsCard">
              <GrShield />
              <span className="Settingtitle">Security </span>
            </div>
            <div className="settingsCard">
              <GrCircleQuestion />
              <span className="Settingtitle">Help and Support </span>
            </div>
            <div className="settingsCard">
              <GrCertificate />
              <span className="Settingtitle">Terms And Conditions </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardProfileComponent;
