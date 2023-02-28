import React, { useState } from "react";
import "./DashboardDetailsComponent.css";
import Tick from "../../../photos/profiledashboard/Tick.png";
import { useEffect } from "react";
import { GetBankDetails } from "../../../redux/actions/UserActions/getBankDetails";
import { handleSnackbar } from "../../../helpers/SnackbarHelper/SnackbarHelper";
import { useDispatch } from "react-redux";

const DashboardDetailsComponent = () => {
  const [Banks, setBanks] = useState([]);
  const [isFetching, setisFetching] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const res = dispatch(GetBankDetails());
    res.then((result) => {
      if (result.success) {
        setBanks(result.banks);
        setisFetching(false);
      } else {
        handleSnackbar(true, "error", "Failed to Fetch user details", dispatch);
      }
    });

    if(Banks.length>0){
      setisFetching(true);
    }
  }, []);


  return (
    <>
      <div className="DashboardDetailsContainer">
        <div className="DashboardDetailsTopContainer">
          <div className="DashboardDetailsSuccessCard">
            <img src={Tick} alt="" />
            <span className="CongratulationsText">Congratulations</span>
            <span className="CongratulationsBelowText">
              You are eligible to apply for loan
            </span>
          </div>
        </div>
        <div className="DashboardDetailsBottomContainer">
          <span className="BankPartnersTitle">
            <span className="BankPartners">Our Bank Partners</span>
            <div className="BanksContainer">
              {Banks?.length > 0 &&
                Banks.map((item) => {
                  return (
                    <>
                      <div className="BankCard">
                        <img
                          src={item.BankLogo}
                          alt="the bank"
                          className="BankCardImage"
                        />
                        <span className="BankcardName">{item.Title}</span>
                      </div>
                      <div className="BankCard">
                        <img
                          src={item.BankLogo}
                          alt="the bank"
                          className="BankCardImage"
                        />
                        <span className="BankcardName">{item.Title}</span>
                      </div>
                      <div className="BankCard">
                        <img
                          src={item.BankLogo}
                          alt="the bank"
                          className="BankCardImage"
                        />
                        <span className="BankcardName">{item.Title}</span>
                      </div>
                    </>
                  );
                })}
                {
                  isFetching && (
                    <>
                      <span className="NoBanksFound">
                       Fetching Banks...
                      </span>
                    </>
                  )
                }
            </div>
          </span>
        </div>
      </div>
    </>
  );
};

export default DashboardDetailsComponent;
