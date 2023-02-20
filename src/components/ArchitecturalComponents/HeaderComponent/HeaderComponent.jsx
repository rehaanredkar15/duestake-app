import React, { useEffect } from "react";
import "./HeaderComponent.css";
import { Link, useLocation } from "react-router-dom";

const HeaderComponent = ({ IsCurrentPage, setIsCurrentPage }) => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setIsCurrentPage(true);
    }
  }, []);

  return (
    <>
      <div className="HeaderComponentContainer">
        <div className="HeaderLogoContainer">DUESTAKE</div>
        <div className="HeadercenterContainer">
          <ul className="HeaderPagesListContainer">
            <li
              className={
                IsCurrentPage
                  ? "HeaderPagesListItemCurrent"
                  : "HeaderPagesListItem"
              }
            >
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                Home
              </Link>
            </li>
            <li className="HeaderPagesListItem">About Us</li>
            <li className="HeaderPagesListItem"> Contact Us</li>
          </ul>
        </div>
        <div className="HeaderRightContainer">
          {location.pathname === "/login" ?
          (<></>)
          :(
            <>
              <Link to="/login">
                <button className="HeaderLoginButton">LOGIN</button>
              </Link>
            </>
          )}
        
        {location.pathname === "/signup" ?
          (<></>)
          :(
            <>
              <Link to="/signup">
              <button className="HeaderSingupButton">SIGNUP</button>
              </Link>
            </>
          )}

        </div>
      </div>
    </>
  );
};

export default HeaderComponent;
