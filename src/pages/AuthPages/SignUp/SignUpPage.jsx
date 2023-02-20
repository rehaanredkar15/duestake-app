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

const SignUpPage = ({ IsCurrentPage, setIsCurrentPage }) => {
  let userSignupContactRef = useRef();
  let userEmail = useRef();
  const [UserPhoneError, setUserPhoneError] = useState("");
  const dispatch = useDispatch();
  const [isFetching, setisFetching] = useState(false);
  const [OpenModal, setOpenModal] = useState(false);
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
      userContactNo: userSignupContactRef.current?.value.split(" ").join(""),
    };

    if (userSignupContactRef.current?.value) {
      const response = dispatch(SendOtp(uploadData));

      response.then(function (result) {
        if (result?.success) {
          setisFetching(false);
          setOpenModal(true);
          handleSnackbar(true, "success", result.message, dispatch);
          // window.alert(result.message);
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

  const handlePhoneChange = (event) => {
    // event.preventDefault();
  };

  const CheckSnackBar = () => {
    handleSnackbar(
      true,
      "warning",
      "Please enter correct details before trying again",
      dispatch
    );
  };

  const handleUserVerifyOtp = (e) => {
    e.preventDefault();
    
    if (userSignupContactRef.current?.value &&  userEmail.current.value &&  Otp.current.value ) {
      setisFetching(true);
    let formData = {
      userContactNo: userSignupContactRef.current.value,
      userEmail: userEmail.current.value,
      verifyCode: Otp.current.value,
    };

    const res = dispatch(UserRegister(formData));
    res.then((result) => {
      if (result.success) {
        // const snackbarDetails = {
        //   snackbarOpen: true,
        //   snackbarType: "success",
        //   snackbarMessage: `Logged In`,
        // };
        // dispatch(ChangeSnackbar(snackbarDetails));
        // window.alert("Created Account Successfully");
        handleSnackbar(true, "Created Account Successfully", "", dispatch);
        setisFetching(false);
        setOpenModal(false);
        navigate("/");
      } else {
        // const snackbarDetails = {
        //   snackbarOpen: true,
        //   snackbarType: "error",
        //   snackbarMessage: `Failed To LogIn : Invalid token`,
        // };
        // dispatch(ChangeSnackbar(snackbarDetails));
        // setOpenModal(false);
        // window.alert("Failed to Create Account");
        handleSnackbar(true, "Failed To Create Account : Invalid token", "", dispatch);
        setisFetching(false);
      }
    });

    }else{
      window.alert('enter all the details')
    }
  };

  return (
    <div className="LoginPageContainer">
      <div className="LoginHeaderComponentHeaderContainer">
        <HeaderComponent
          IsCurrentPage={IsCurrentPage}
          setIsCurrentPage={setIsCurrentPage}
        />
      </div>
      <Dialog open={OpenModal} height={"xl"}>
        <DialogTitle> Enter the OTP Sent To Your Phone</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="OTP"
            type="number"
            inputRef={Otp}
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            label="Email"
            inputRef={userEmail}
            variant="outlined"
            style={{ width: "50%",marginTop:6,marginLeft:2 }}
            placeholder="Enter your Email Id"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalUpdate} style={{ color: "grey" }}>
            Cancel
          </Button>
          <Button onClick={handleUserVerifyOtp}>  {isFetching ? <CircularProgress size="20px" /> : "Verify"} </Button>
        </DialogActions>
      </Dialog>
      <div className="LoginPageMainContainer">
        <div className="LoginPageFormContainer">
          <div className="phoneInputContainer">
            <PhoneInput
              error={UserPhoneError}
              placeholder="Enter phone number"
              ref={userSignupContactRef}
              onChange={(e) => handlePhoneChange(e)}
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
                }}
              >
                Login
              </span>
            </Link>
          </span>
        </div>
      </div>
      <span className="BottomMostText">
        Copyright @ DuesTake 2022. All Rights Reserved.
      </span>
    </div>
  );
};

export default SignUpPage;
