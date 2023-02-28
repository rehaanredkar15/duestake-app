import React from "react";
import "./ImpactComponent.css";
import ICCI from "../../../photos/process/ICCI.png";
import Bajaj from "../../../photos/process/bajaj.png";
import InCred from "../../../photos/process/InCred.png";
import MoneyView from "../../../photos/process/moneyview.png";

const ImpactComponent = () => {
  return (
    <>
      <div className="ImpactMainComponent">
        <div className="ImpactMainTitle">Our Impact</div>
        <div className="DuesStakeImpactContainerMain">
          <div className="DuestakeImpactBox">
            <span className="ProcessNameTitle">1000Cr+</span>
            <div className="DuestakeImpactContainer">
              <span className="ProcessName">Loans Disbursed</span>
            </div>
          </div>
          <div className="DuestakeImpactBox">
            <span className="ProcessNameTitle">5000+</span>
            <div className="DuestakeImpactContainer">
              <span className="ProcessName">Partners</span>
            </div>
          </div>
          <div className="DuestakeImpactBox">
            <span className="ProcessNameTitle">40+</span>
            <div className="DuestakeImpactContainer">
              <span className="ProcessName">Products</span>
            </div>
          </div>
          <div className="DuestakeImpactBox">
            <span className="ProcessNameTitle">310000</span>
            <div className="DuestakeImpactContainer">
              <span className="ProcessName">Satisfied Customers</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImpactComponent;
