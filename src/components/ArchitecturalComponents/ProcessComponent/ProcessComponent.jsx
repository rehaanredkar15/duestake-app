import React from "react";
import "./ProcessComponent.css";
import CardIcon from "../../../photos/CardIcon.png";
import CardIcon2 from "../../../photos/CardIcon2.png";

const ProcessComponent = () => {
  return (
    <>
      <div className="ProcessMainContainer">
        <div className="ProcessTopContainer">
          <span className="ProcessTitle">Top Banks & Financials</span>
          <span className="ProcessBottomInfo">
            Bringing you the Best Products from Top Banks & Financial
            Institutions.{" "}
          </span>
        </div>
        <div className="ProcessMainDataContainer">
          <div className="ProcessMainDataComponent">
            <div className="CardTopContainer">01</div>
            <div className="ProcessInformationContainer">
              <div className="CardTopIconContainer">
                <img src={CardIcon} alt="" className="CardIconImage" />
              </div>
              <span className="CardTitleContainer">Apply for laon</span>
              <span className="CardBottomDetailsContainer">
                orem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna{" "}
              </span>
            </div>
          </div>
          <div className="ProcessMainDataComponent">
            <div className="CardTopContainer">02</div>
            <div className="ProcessInformationContainer">
              <div className="CardTopIconContainer">
                <img src={CardIcon2} alt="" className="CardIconImage" />
              </div>
              <span className="CardTitleContainer">Get Credit card</span>
              <span className="CardBottomDetailsContainer">
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProcessComponent;
