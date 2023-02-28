import React, { useState } from "react";
import "./CalculatorComponent.css";
import Slider from "@mui/material/Slider";
import { useNavigate } from "react-router-dom";

const CalculatorComponent = () => {
  const [loanAmount, setLoanAmount] = useState(5000);
  const [interestRate, setInterestRate] = useState(5);
  const [loanTerm, setLoanTerm] = useState(36);
  const [MonthlyReturnValue, setMonthlyReturnValue] = useState(36);
  const [TotalPayBack, setTotalPayBack] = useState(36);
 const navigate = useNavigate();

  const handleLoanAmountChange = (e) => {
    setLoanAmount(e.target.value);
    calculateMonthlyPayment();
  };



  const handleLoanTermChange = (e) => {
    setLoanTerm(e.target.value);
    calculateMonthlyPayment();
  };

  const calculateMonthlyPayment = () => {
    const monthlyInterestRate = interestRate / 1200;
    const numerator = monthlyInterestRate * loanAmount;
    const denominator = 1 - Math.pow(1 + monthlyInterestRate, -loanTerm);
    let value = (numerator / denominator).toFixed(2);
    CalculateCompletePayback();
    setMonthlyReturnValue(value);
    return value;
  };

  const CalculateCompletePayback = () => {
    let value = MonthlyReturnValue * loanTerm;
    setTotalPayBack(value);
    return value;
  };

  return (
    <>
      <div className="CalculatorMainContainer">
        <div className="PrincipalAmountScrolbar">
          <div className="AmountContainer">
            <span className="AmountContainerValue">1 Rs</span>
            <span className="AmountContainerValue">{Math.floor(loanAmount)}Rs</span>
          </div>

          <input
            type="range"
            id="loan-amount"
            name="loan-amount"
            min="1000"
            max="100000"
            step="1000"
            className="SliderOP"
            value={loanAmount}
            onChange={handleLoanAmountChange}
          />
        </div>
        <div className="PrincipalAmountScrolbar">
          <div className="AmountContainer">
            <span className="AmountContainerValue">1 Month</span>
            <span className="AmountContainerValue">{loanTerm} Month</span>
          </div>
          <input
            type="range"
            id="loan-term"
            name="loan-term"
            min="12"
            max="60"
            className="SliderOP"
            step="12"
            value={loanTerm}
            onChange={handleLoanTermChange}
          />
        </div>
        <div className="AmountCalcultorBottom">
          <div className="AmountRepresenting">
            <span className="PayMonntly">Pay Monthly</span>
            <span className="PayMonntlyValue"> {Math.floor(MonthlyReturnValue)}Rs</span>
          </div>
          <div className="AmountRepresenting">
            <span className="TermsOfUser">Terms Of Use</span>
            <span className="TermsOfUserValue">{loanTerm} Month</span>
          </div>
          <div className="AmountRepresenting">
            <span className="PayBack">Total PayBack</span>
            <span className="PayBackValue">{Math.floor(TotalPayBack)} Rs</span>
          </div>
        </div>
        <div className="ApplyLoanButton">
          <button className="ApplyForLoan" onClick={(e) => navigate("/login")} style={{cursor:'pointer'}}>Apply for Loan</button>
          <span className="TermsConditionLine">
            Results might be different Depending on other factors
          </span>
        </div>
      </div>
    </>
  );
};

export default CalculatorComponent;
