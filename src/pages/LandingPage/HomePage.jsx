import React from "react";
import PartnerComponent from "../../components/ArchitecturalComponents/PartnerComponent/PartnerComponent";
import BanerComponent from "../../components/ArchitecturalComponents/BannerComponent/BanerComponent";
import ProcessComponent from "../../components/ArchitecturalComponents/ProcessComponent/ProcessComponent";
import SubBanerComponent from "../../components/ArchitecturalComponents/SubBanerComponent/SubBanerComponent";
import "./LandingPage.css";
import ImpactComponent from "../../components/ArchitecturalComponents/ImpactComponent/ImpactComponent";

const HomePage = () => {
  return (
    <>
      <div className="LandingPageHeadContainer">
        <div className="LandingPageMainBanner">
          <BanerComponent />
        </div>
        <div className="LandingPagePartnerComponent">
          <PartnerComponent />
        </div>
        <div className="LadingPageProcessComponent">
          <ProcessComponent />
        </div>
        <div className="LadingPageSubBanerComponent">
          <SubBanerComponent />
        </div>
        <div className="LadingPageImpactComponent">
          <ImpactComponent />
        </div>
      </div>
    </>
  );
};

export default HomePage;
