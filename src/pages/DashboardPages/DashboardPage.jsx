import React, { useEffect, useState } from "react";
import DashboardComponent from "../../components/DashboardComponents/DashboardComponent/DashboardComponent";
import DashboardFormComponent from "../../components/DashboardComponents/DashboardFormComponent";
import "./Dashboard.css";

const DashboardPage = () => {
  const [ShowOnboarding, setShowOnboarding] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if(user.userInformationLevel.length>=5){
      setShowOnboarding(true);
    }else{
      setShowOnboarding(false);
    }
  }, [user])
  
  return (
    <>
      <div className="DashboardPageContainer">
        {!ShowOnboarding ? (
          <div className="FomPageComponent">
            <DashboardFormComponent />
          </div>
        ) : (
          <DashboardComponent />
        )}
      </div>
    </>
  );
};

export default DashboardPage;
