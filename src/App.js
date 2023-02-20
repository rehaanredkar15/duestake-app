import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Snackbar from './components/HelperComponents/Snackbar';
import ScrollToTop from './helpers/ScrollingToTopHelper/ScrollToTop'
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/AuthPages/Login/LoginPage';
import { useState } from 'react';
import SignUpPage from './pages/AuthPages/SignUp/SignUpPage';



function App() {
  const [IsCurrentPage, setIsCurrentPage] = useState(false)

  return (
    <>
     <Snackbar/>
     <BrowserRouter>
       <ScrollToTop/>
      <Routes>
        <Route path="/" element={<LandingPage IsCurrentPage={IsCurrentPage} setIsCurrentPage={setIsCurrentPage} />} />
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/signup" element={<SignUpPage />}/>
      </Routes>
    </BrowserRouter>
  </> 
  );
}

export default App;
