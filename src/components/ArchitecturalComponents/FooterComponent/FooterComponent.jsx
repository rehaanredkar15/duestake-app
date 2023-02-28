import React from "react";
import "./FooterComponent.css";
import {
  AiFillLinkedin,
  AiFillFacebook,
  AiFillTwitterCircle,
  AiFillInstagram,
} from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import LogoPng from "../../../photos/header/Logo.png";
import { TextField } from "@mui/material";

const FooterComponent = () => {
  return (
    <>
      <div className="FooterMainContainerComponent">
        <div className="FooterContainerHead">
          <div className="FooterCompanyDetails">
            <div className="FooterCompanyDetailsTop">
              <span className="FooterCompanyName">
                <Link to="/" style={{ textDecoration: "none" }}>
                  <img
                    src={LogoPng}
                    alt="Duestake"
                    className="LogoDuestakeFooter"
                  />
                </Link>
              </span>
              <span className="FooterCompanyNameBottom">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud
              </span>
            </div>
            <div className="FooterCompanyDetailsContactSection">
              <span className="MobileDetailsFooter">Mobile : 8010243785</span>
              <span className="MobileDetailsFooter">
                Email : Info@deustack@gmail.com
              </span>
            </div>
          </div>
          <div className="FooterCompanyDetailsBottom">
            <span className="RightsFooter">@ 2022 All Rights Reserved</span>
          </div>
        </div>
        <div className="FooterContainerCompany">
          <span className="TitleBottomComponent">What we Offer?</span>
          <ul className="TitleBottomList">
            <li className="TitleBottomListItem">Lorem </li>
            <li className="TitleBottomListItem">Lorem </li>
            <li className="TitleBottomListItem">Lorem </li>
            <li className="TitleBottomListItem">Lorem </li>
          </ul>
        </div>
        <div className="FooterContainerResources">
          <span className="TitleBottomComponent">Who We Are?</span>
          <ul className="TitleBottomList">
            <li className="TitleBottomListItem">Lorem </li>
            <li className="TitleBottomListItem">Lorem </li>
            <li className="TitleBottomListItem">Lorem </li>
            <li className="TitleBottomListItem">Lorem </li>
          </ul>
        </div>
        <div className="FooterContainerNewsletter">
          <div className="FooterContainerNews">
            <span className="FooterJoinOur">Newsletter</span>
            <div className="EmailInputContainer">
              <TextField
                id="standard-basic"
                label="Email"
                variant="standard"
              />
              <button className="EmailAddressSubscribe">Subscribe</button>
            </div>
          </div>
          <div className="BottomIconsForEmail">
            <AiFillFacebook className="FooterBottomIcon" />
            <AiFillInstagram className="FooterBottomIcon" />
            <AiFillLinkedin className="FooterBottomIcon" />
            <AiFillTwitterCircle className="FooterBottomIcon" />
          </div>
        </div>
      </div>
    </>
  );
};

export default FooterComponent;
