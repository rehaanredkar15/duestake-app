import { Button, CircularProgress, TextField } from "@mui/material";
import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import HeaderComponent from "../../../components/ArchitecturalComponents/HeaderComponent/HeaderComponent";
import "./LoginPage.css";
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



const LoginPage = ({ IsCurrentPage, setIsCurrentPage }) => {
  let userLoginContactRef = useRef();
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
    if (!userLoginContactRef.current?.value) {
      setUserPhoneError(true);
    } else if (userLoginContactRef.current?.value) {
      setUserPhoneError(false);
    }

    let uploadData = {
      userContactNo: userLoginContactRef.current?.value.split(" ").join(""),
    };

    if (userLoginContactRef.current?.value) {
      const response = dispatch(UserLogin(uploadData));

      response.then(function (result) {
        if (result.success) {
          setOpenModal(true);
          handleSnackbar(true, "success", result.message, dispatch);
          // window.alert(result.message);
          setisFetching(false);
        } else {
          handleSnackbar(
            true,
            "error",
            result.message
              ? result.message
              : "Creating User Failed " + result.message,
            dispatch
          );
          // window.alert('User Not Found')
          setisFetching(false);
        }
      });
    } else {
      handleSnackbar(
        true,
        "warning",
        "Please enter correct details before trying again",
        dispatch
      );
      setisFetching(false);
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
    setisFetching(true);
    e.preventDefault();
    let formData = {
      userContactNo: userLoginContactRef.current.value,
      verifyCode: Otp.current.value,

    };

    const res = dispatch(VerifyOtp(formData));
    res.then((result) => {
      if (result?.success) {

          handleSnackbar(
            true,
            "success",
            "Logged In",
            dispatch
          );
          // window.alert('Logged In')
          setisFetching(false);
          setOpenModal(false);

      } else {
        handleSnackbar(
          true,
          "error",
          "Failed To LogIn : Invalid token",
          dispatch
        );
        // window.alert('Logged In')
        setisFetching(false);
        setOpenModal(false);
        navigate("/")
      }
    });
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
            sx={{ marginTop: 2 }}
            type="number"
            inputRef={Otp}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalUpdate} style={{ color: "grey" }}>
            Cancel
          </Button>
          <Button onClick={handleUserVerifyOtp}>{isFetching ? <CircularProgress size="20px" /> : "Verify"}</Button>
        </DialogActions>
      </Dialog>

      <div className="LoginPageMainContainer">
        <div className="LoginPageFormContainer">
          <div className="phoneInputContainer">
            <PhoneInput
              error={UserPhoneError}
              placeholder="Enter phone number"
              ref={userLoginContactRef}
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
            {isFetching ? <CircularProgress size="20px" /> : "Log In"}
          </Button>
          <span className="AlreadyHaveAnAccount">
            New To DuesTake ,
            <Link to="/signup">
              <span
                className="AlreadyHaveAnAccount"
                style={{
                  cursor: "pointer",
                }}
              >
                Create Account
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

export default LoginPage;
