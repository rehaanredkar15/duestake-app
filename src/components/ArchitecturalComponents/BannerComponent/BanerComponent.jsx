import React from "react";
import "./BanerComponent.css";
import EWallet  from '../../../photos/EWallet.png';
import CalculatorComponent from "../../HelperComponents/CalculatorComponents/CalculatorComponent";
import Baner  from '../../../photos/Baner/baner.png'


const BanerComponent = () => {
  return (
    <>
      <div className="BanerMainContainer">
        <span className="CalcutorTitle">Calculate How Much Loan Do You Need?</span>
        <div className="CalculatorContainer">
          <div className="CalculatorLeftImageContainer">
           <img src={Baner} alt="" className="CalculatorImageContainer"/>
          </div>
          <div className="CalculatorRightCalculator">
            <CalculatorComponent/>
          </div>
        </div>
      </div>
    </>
  );
};

export default BanerComponent;
