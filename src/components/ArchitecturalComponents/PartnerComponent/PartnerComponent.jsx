import React from "react";
import "./PartnerComponent.css";
import icci from '../../../photos/icci.png';

const PartnerComponent = () => {
  return (
    <>
      <div className="PartnerMainComponent">
        <div className="PartnetMainTitle">DueStake's Partner</div>
        <div className="DuesStakePartnerContainer">
          <div className="DuestakePartnerContainer">
            <img src={icci} alt="bankLogo" className="DuestakePartnerBankImg" />
          </div>
          <div className="DuestakePartnerContainer">
          <img src={icci} alt="bankLogo" className="DuestakePartnerBankImg" />
          </div>
          <div className="DuestakePartnerContainer">
          <img src={icci} alt="bankLogo" className="DuestakePartnerBankImg" />
          </div>
          <div className="DuestakePartnerContainer">
          <img src={icci} alt="bankLogo" className="DuestakePartnerBankImg" />
          </div>
        </div>
      </div>
    </>
  );
};

export default PartnerComponent;
