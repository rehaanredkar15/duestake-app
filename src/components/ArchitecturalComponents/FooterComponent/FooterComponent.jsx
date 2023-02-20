import React from "react";
import "./FooterComponent.css";
import { AiFillLinkedin,AiFillFacebook,AiFillTwitterCircle } from "react-icons/ai";



const FooterComponent = () => {
  return (
    <>
      <div className="FooterMainContainer">
        <div className="FooterContainerHead">
          <div className="FooterCompanyDetails">
            <div className="FooterCompanyDetailsTop">
              <span className="FooterCompanyName">DuesTake</span>
              <span className="FooterCompanyNameBottom">
                Endless Possibilities
              </span>
            </div>
            <div className="FooterCompanyDetailsBottom">
              <AiFillLinkedin className="FooterBottomIcon"/> <AiFillFacebook  className="FooterBottomIcon"/>
              <AiFillTwitterCircle  className="FooterBottomIcon"/>
            </div>
          </div>
        </div>
        <div className="FooterContainerCompany">
          <span className="TitleBottomComponent">Company</span>
          <ul className="TitleBottomList">
            <li className="TitleBottomListItem">Lorem Ipsum</li>
            <li className="TitleBottomListItem">Lorem Ipsum</li>
            <li className="TitleBottomListItem">Lorem Ipsum</li>
            <li className="TitleBottomListItem">Lorem Ipsum</li>
          </ul>
        </div>
        <div className="FooterContainerResources">
          <span className="TitleBottomComponent">Resources</span>
          <ul className="TitleBottomList">
            <li className="TitleBottomListItem">Lorem Ipsum</li>
            <li className="TitleBottomListItem">Lorem Ipsum</li>
            <li className="TitleBottomListItem">Lorem Ipsum</li>
            <li className="TitleBottomListItem">Lorem Ipsum</li>
          </ul>
        </div>
        <div className="FooterContainerNewsletter">
          <div className="FooterContainerNews">
            <span className="FooterJoinOur">Join Our Newsletter</span>
            <div className="EmailInputContainer">
              <input
                type="text"
                className="EmailAddressInput"
                placeholder="Your Email Address"
              />
              <button className="EmailAddressSubscribe">Subscribe</button>
            </div>
            <span className="BottomTextForEmail">
              * Will send you weekly updates for your better finance management.
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default FooterComponent;
