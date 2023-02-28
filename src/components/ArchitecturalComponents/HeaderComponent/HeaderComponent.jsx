import React, { useEffect } from "react";
import "./HeaderComponent.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoPng from "../../../photos/header/Logo.png";

const HeaderComponent = ({ IsCurrentPage, setIsCurrentPage }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (location.pathname === "/") {
      setIsCurrentPage(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();     
    window.location.reload();
    // navigate("/")
  }

  return (
    <>
      <div className="HeaderComponentContainer">
        <div className="HeaderLogoContainer">
          <Link to="/" style={{ textDecoration: "none" }}>
            <img src={LogoPng} alt="Duestake" className="LogoDuestake" />
          </Link>
        </div>
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
          </ul>
        </div>
        <div className="HeaderRightContainer">
          {user && user?._id ? (
            <>
             <button className="HeaderLoginButton" onClick={handleLogout}>LOGOUT</button>
            </>
          ) : (
            <>
              {location.pathname === "/login" ? (
                <></>
              ) : (
                <>
                  <Link to="/login">
                    <button className="HeaderLoginButton">LOGIN</button>
                  </Link>
                </>
              )}

              {location.pathname === "/signup" ? (
                <></>
              ) : (
                <>
                  <Link to="/signup">
                    <button className="HeaderSingupButton">SIGN UP</button>
                  </Link>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default HeaderComponent;
