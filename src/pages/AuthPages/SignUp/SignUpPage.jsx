import React, { useRef } from "react";
import { Button, CircularProgress, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import HeaderComponent from "../../../components/ArchitecturalComponents/HeaderComponent/HeaderComponent";
import "./SignUpPage.css";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useState } from "react";
import { handleSnackbar } from "../../../helpers/SnackbarHelper/SnackbarHelper";
import { useDispatch } from "react-redux";
import { UserLogin } from "../../../redux/actions/AuthActions/UserLoginAction";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { VerifyOtp } from "../../../redux/actions/AuthActions/VerifyOtpAction";
import { SendOtp } from "../../../redux/actions/AuthActions/SendOtpAction";
import { UserRegister } from "../../../redux/actions/AuthActions/UserRegisterAction";
import { GetUserById } from "../../../redux/actions/UserActions/getUserByIdAction";

const SignUpPage = ({ IsCurrentPage, setIsCurrentPage }) => {
  let userSignupContactRef = useRef(null);
  let userEmail = useRef();
  const [UserPhoneError, setUserPhoneError] = useState("");
  const dispatch = useDispatch();
  const [isFetching, setisFetching] = useState(false);
  const [OpenModal, setOpenModal] = useState(false);
  const [UserId, setUserId] = useState(false);
  const Otp = useRef();
  const navigate = useNavigate();

  const handleModalUpdate = () => {
    setOpenModal(false);
    setisFetching(false);
  };

  const handleLogin = () => {
    setisFetching(true);
    if (!userSignupContactRef.current?.value) {
      setUserPhoneError(true);
    } else if (userSignupContactRef.current?.value) {
      setUserPhoneError(false);
    }

    let uploadData = {
      userContactNo: "+91" + userSignupContactRef.current?.value,
    };

    if (userSignupContactRef.current?.value) {
      const response = dispatch(SendOtp(uploadData));

      response.then(function (result) {
        if (result?.success) {
          setisFetching(false);
          setOpenModal(true);
          handleSnackbar(true, "success", result.message, dispatch);
        } else {
          setisFetching(false);
          handleSnackbar(
            true,
            "error",
            result.message
              ? result.message
              : "Creating User Failed " + result.message,
            dispatch
          );
        }
      });
    } else {
      setisFetching(false);
      handleSnackbar(
        true,
        "warning",
        "Please enter correct details before trying again",
        dispatch
      );
    }
  };


  const handleUserVerifyOtp = (e) => {
    e.preventDefault();

    if (
      Otp.current.value
    ) {
      setisFetching(true);
      let formData = {};

      if( userEmail?.current?.value){

        formData = {
          userContactNo: "+91"+ userSignupContactRef.current.value,
          userEmail: userEmail.current.value,
          verifyCode: Otp.current.value,
        };
      }else{
        formData = {
          userContactNo: "+91"+ userSignupContactRef.current.value,
          verifyCode: Otp.current.value,
        };
      }

      const res = dispatch(UserRegister(formData));
      res.then((result) => {
        if (result.success) {
          handleSnackbar(true,"success","Created Account Successfully",  dispatch);
          setisFetching(false);
          setOpenModal(false);
          getUserById(result.data);
        } else {
          handleSnackbar(
            true,
            "error",
            "Failed To Create Account : Invalid token",
            dispatch
          );
          setisFetching(false);
        }
      });
    } else {
      handleSnackbar(
        true,
        "warning",
        "Please Enter OTP",
        dispatch
      );
    }
  };

  const getUserById = (Id) => {
    const res = dispatch(GetUserById(Id,navigate));
    res.then((result) => {
      if (result?.success) {
        handleSnackbar(true, "success", "Fetched User By Id", dispatch);
      } else {
        handleSnackbar(
          true,
          "error",
          "Failed to Fetch user details",
          dispatch
        );
      }
    });
  }

  console.log(userSignupContactRef?.current?.value);



  return (
    <div className="LoginPageContainer">
      <Dialog open={OpenModal} height={"xl"}>
        <DialogTitle> Enter the OTP Sent To Your Phone</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="OTP"
            type="number"
            inputRef={Otp}
            fullWidth
            variant="outlined"
            />
          <TextField
            id="outlined-basic"
            label="Email(optional)"
            inputRef={userEmail}
            fullWidth
            variant="outlined"
            style={{  marginTop: 6, marginLeft: 2 }}
            placeholder="Enter your Email Id"
          />
        </DialogContent>
        <DialogActions>
        <Button onClick={handleModalUpdate} style={{ color: "grey" }}>
            Edit Contact Number
          </Button>
          <Button onClick={handleUserVerifyOtp}>
            {" "}
            {isFetching ? <CircularProgress size="20px" /> : "Verify"}{" "}
          </Button>
        </DialogActions>
      </Dialog>
      <div className="LoginPageMainContainer">
        <div className="LoginPageFormContainer">
          <div className="phoneInputContainer">
            <TextField
              autoFocus
              margin="dense"
              error={UserPhoneError}
              placeholder="Enter phone number"
              inputRef={userSignupContactRef}
              label="Contact Number"
              sx={{ marginTop: 2, width: "20rem" }}
              type="tel"
              variant="outlined"
            />
          </div>
          {UserPhoneError && (
            <p style={{ color: "red" }}>Please Enter the Contact Number</p>
          )}
          <Button
            variant="contained"
            style={{ width: "50%" }}
            onClick={handleLogin}
          >
            {isFetching ? <CircularProgress size="20px" /> : "Create Account"}
          </Button>
          <span className="AlreadyHaveAnAccount">
            Already have an Account,  
            <Link to="/login">
              <span
                className="AlreadyHaveAnAccount"
                style={{
                  cursor: "pointer",
                  marginLeft:'10px'
                }}
              >
                Login
              </span>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
