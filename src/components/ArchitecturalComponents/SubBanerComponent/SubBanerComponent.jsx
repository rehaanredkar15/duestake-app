import React from "react";
import "./SubBanerComponent.css";
import CTA from "../../../photos/Subbaner/MobilePhone.png";

const SubBanerComponent = () => {
  return (
    <>
      <div className="SubBannerMainContainer">
        <div className="SubBannerContainerImage">
          <img src={CTA} alt="iphone" className="SubBanerImage" />
        </div>
        <div className="SubBannerContainerContents">
          <div className="SubBanerContainerTitleKey">
            <span className="SubBanerContainerTitleValue">
              Change this Data Accordingly
            </span>
          </div>
          <div className="SubBanerContainerContent">
            <span className="SubBanerContainerKey">Anybody Can Earn</span>
            <span className="SubBanerContainerValue">
              A platform where anybody can earn through us
            </span>
          </div>
          <div className="SubBanerContainerContent">
            <span className="SubBanerContainerKey">Refer and Earn</span>
            <span className="SubBanerContainerValue">
              ‘Refer and Earn’ program where referrer will get additional
              benefits per successful sign up
            </span>
          </div>
          <div className="SubBanerContainerContent">
            <span className="SubBanerContainerKey">Anybody Can Earn</span>
            <span className="SubBanerContainerValue">
              Partners will get 5% of the total earnings by the team
            </span>
          </div>
          <div className="SubBanerContainerContent">
            <span className="SubBanerContainerKey">Anybody Can Earn</span>
            <span className="SubBanerContainerValue">
              Highest agent payout in industry
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubBanerComponent;
