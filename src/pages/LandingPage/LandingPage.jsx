import React, { useState } from "react";
import FooterComponent from "../../components/ArchitecturalComponents/FooterComponent/FooterComponent";
import HeaderComponent from "../../components/ArchitecturalComponents/HeaderComponent/HeaderComponent";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import "./LandingPage.css";
import LoginPage from '../AuthPages/Login/LoginPage';
import SignUpPage from '../AuthPages/SignUp/SignUpPage';
import HomePage from "./HomePage";
import DashboardPage from "../DashboardPages/DashboardPage";
import { useSelector } from "react-redux";


const LandingPage = () => {
  const [IsCurrentPage, setIsCurrentPage] = useState(false)
  const userDetails = useSelector((state) => state.user);
  const user = JSON.parse(localStorage.getItem("user"));

  console.log(user);

  

  return (
    <>
      <div className="LandingPageContainer">
        <div className="HeaderComponentHeaderContainer">
          <HeaderComponent
            IsCurrentPage={IsCurrentPage}
            setIsCurrentPage={setIsCurrentPage}
          />
        </div>
        <Routes>
          <Route path="/login"  element={user && user?._id ? <Navigate to="/dashboard"/> : <LoginPage />} />
          <Route path="/signup" element={user && user?._id ? <Navigate to="/dashboard"/> : <SignUpPage />} />
          <Route path="/"  element={user && user?._id ? <Navigate to="/dashboard"/> : <HomePage/>}/>
          <Route path="/dashboard" element={user && user?._id ? <DashboardPage /> :  <Navigate to="/"/>} />
        </Routes>
        <div className="FooterComponent">
          <FooterComponent />
        </div>
      </div>
    </>
  );
};

export default LandingPage;
