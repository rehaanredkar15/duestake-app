import React from "react";
import "./BanerComponent.css";
import EWallet  from '../../../photos/EWallet.png';


const BanerComponent = () => {
  return (
    <>
      <div className="BanerMainContainer">
        <div className="BanerLeftContainer">
          <div className="BanerLeftTopContainer">
            <span className="BanerLeftTopContainer">
              Best Solution for all Type of Loan
            </span>
          </div>
          <div className="BanerLeftBottomContainer">
            <span className="BannerLeftBottomText">
              To get a loan , apply with necessary documentation.If approved,
              receive funds and make payments as agreed
            </span>
             <button className="ApplyForLoanBtn">
                Apply For Loan
             </button>
          </div>
        </div>
        <div className="BanerLeftContainerRight">
          <img src={EWallet} alt="banerComponent" className="BannerLeftContainerRightImage" />
        </div>
      </div>
    </>
  );
};

export default BanerComponent;
