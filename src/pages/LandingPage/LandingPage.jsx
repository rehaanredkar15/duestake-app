import React, { useState } from "react";
import BanerComponent from "../../components/ArchitecturalComponents/BannerComponent/BanerComponent";
import FooterComponent from "../../components/ArchitecturalComponents/FooterComponent/FooterComponent";
import HeaderComponent from "../../components/ArchitecturalComponents/HeaderComponent/HeaderComponent";
import PartnerComponent from "../../components/ArchitecturalComponents/PartnerComponent/PartnerComponent";
import ProcessComponent from "../../components/ArchitecturalComponents/ProcessComponent/ProcessComponent";
import SubBanerComponent from "../../components/ArchitecturalComponents/SubBanerComponent/SubBanerComponent";
import './LandingPage.css'



const LandingPage = ({IsCurrentPage,setIsCurrentPage}) => {

  return (
    <>
      <div className="LandingPageContainer">
        <div className="HeaderComponentHeaderContainer">
          <HeaderComponent IsCurrentPage={IsCurrentPage} setIsCurrentPage={setIsCurrentPage}/>
        </div>
        <div className="LandingPageMainBanner">
          <BanerComponent/>
        </div>
        <div className="LandingPagePartnerComponent">
          <PartnerComponent/>
        </div>
        <div className="LadingPageProcessComponent">
          <ProcessComponent/>
        </div>
        <div className="LadingPageSubBanerComponent">
          <SubBanerComponent/>
        </div>
        <div className="FooterComponent">
          <FooterComponent/>
        </div>
        <span className="BottomMostText">Copyright @ DuesTake 2022. All Rights Reserved.</span>
      </div>
    </>
  );
};

export default LandingPage;
