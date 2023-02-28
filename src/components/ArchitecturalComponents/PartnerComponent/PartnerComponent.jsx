import React from "react";
import "./PartnerComponent.css";
import icci from "../../../photos/icci.png";
import business from "../../../photos/partner/business.png";
import Gold from "../../../photos/partner/Gold.png";
import Home from "../../../photos/partner/Home.png";
import medical from "../../../photos/partner/medical.png";
import personal from "../../../photos/partner/personal.png";
import travel from "../../../photos/partner/travel.png";
import property from "../../../photos/partner/property.png";
import vehical from "../../../photos/partner/vehical.png";


const PartnerComponent = () => {
  return (
    <>
      <div className="PartnerMainComponent">
        <div className="PartnetMainTitle">Loans We Offer</div>
        <span className="LoanDetailBottom">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Necessitatibus voluptatibus eligendi nam rem saepe minima, ratione
          doloremque odio quam error sit labore assumenda omnis perspiciatis
          itaque aliquam possimus velit veniam.
        </span>
        <div className="DuesStakePartnerContainer">
          <div className="DuestakePartnerContainer">
            <img src={vehical} alt="icon" className="PartnerIcon"/>
            
            <span className="PartnerIconTitle">Personal Loan</span>
          </div>
          <div className="DuestakePartnerContainer">
            <img src={property} alt="icon" className="PartnerIcon"/>
            <span className="PartnerIconTitle">Business Loan</span>
          </div>
          <div className="DuestakePartnerContainer">
            <img src={business} alt="icon" className="PartnerIcon"/>
            <span className="PartnerIconTitle">Vehical Loan</span>
          </div>
          <div className="DuestakePartnerContainer">
            <img src={travel} alt="icon" className="PartnerIcon"/>
            <span className="PartnerIconTitle"> Travel Loan</span>
          </div>
          <div className="DuestakePartnerContainer"> 
            <img src={Home} alt="icon" className="PartnerIcon"/>
            <span className="PartnerIconTitle">Property Loan</span>
          </div>
          <div className="DuestakePartnerContainer">
            <img src={medical} alt="icon" className="PartnerIcon"/>
            <span className="PartnerIconTitle">Home Loan</span>
          </div>
          <div className="DuestakePartnerContainer">
            <img src={Gold} alt="icon" className="PartnerIcon"/>
            <span className="PartnerIconTitle">Gold Loan</span>
          </div>
          <div className="DuestakePartnerContainer">
            <img src={personal} alt="icon" className="PartnerIcon"/>
            <span className="PartnerIconTitle">Medical Loan</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default PartnerComponent;
