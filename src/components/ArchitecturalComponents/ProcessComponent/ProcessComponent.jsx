import React from "react";
import "./ProcessComponent.css";
import ICCI from '../../../photos/process/ICCI.png'
import Bajaj from '../../../photos/process/bajaj.png'
import InCred from '../../../photos/process/InCred.png'
import MoneyView from '../../../photos/process/moneyview.png'


const ProcessComponent = () => {
  return (
    <>
      <div className="ProccesMainComponent">
        <div className="ProccesMainTitle">Our Partners</div>
        <div className="DuesStakeProccesContainerMain">
          <div className="DuestakeProccesContainer">
            <img
              src={ICCI}
              alt="bankLogo"
              className="DuestakeProccessBankImg"
            />
            <span className="ProcessName">ICCI Bank</span>
          </div>
          <div className="DuestakeProccesContainer">
            <img
              src={Bajaj}
              alt="bankLogo"
              className="DuestakeProccessBankImg"
            />
              <span className="ProcessName">Bajaj Finserv</span>
          </div>
          <div className="DuestakeProccesContainer">
            <img
              src={InCred}
              alt="bankLogo"
              className="DuestakeProccessBankImg"
            />
            <span className="ProcessName">In Cred</span>
          </div>
          <div className="DuestakeProccesContainer">
            <img
              src={MoneyView}
              alt="bankLogo"
              className="DuestakeProccessBankImg"
            />
              <span className="ProcessName">Money View</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProcessComponent;
