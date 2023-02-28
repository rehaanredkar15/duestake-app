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
import { GetUserById } from "../../../redux/actions/UserActions/getUserByIdAction";

const LoginPage = ({ IsCurrentPage, setIsCurrentPage }) => {
  let userLoginContactRef = useRef(null);
  const Otp = useRef();
  const navigate = useNavigate();
  const [UserPhoneError, setUserPhoneError] = useState("");
  const dispatch = useDispatch();
  const [isFetching, setisFetching] = useState(false);
  const [OpenModal, setOpenModal] = useState(false);
  const [UserId, setUserId] = useState(false);

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
      userContactNo: "+91" + userLoginContactRef.current?.value,
    };

    if (userLoginContactRef.current?.value) {
      const response = dispatch(UserLogin(uploadData));

      response.then(function (result) {
        if (result.success) {
          setOpenModal(true);
          handleSnackbar(true, "success", result.message, dispatch);
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

  const handleUserVerifyOtp = (e) => {
    setisFetching(true);
    e.preventDefault();
    let formData = {
      userContactNo: "+91" + userLoginContactRef.current.value,
      verifyCode: Otp.current.value,
    };

    const res = dispatch(VerifyOtp(formData));
    res.then((result) => {
      if (result?.success) {
        handleSnackbar(true, "success", "Logged In", dispatch);
        setUserId(result.data)
        getUserById(result.data);
        setisFetching(false);
        setOpenModal(false);
      } else {
        handleSnackbar(
          true,
          "error",
          "Failed To LogIn : Invalid token",
          dispatch
        );
        setisFetching(false);
        Otp.current.value = "";
      }
    });
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

  return (
    <div className="LoginPageContainer">
      <Dialog
        open={OpenModal}
        height={"xl"}
        PaperProps={{ style: { width: "400px", height: "300px" } }}
      >
        <DialogTitle>
          {" "}
          Enter the OTP Sent To {userLoginContactRef?.current?.value}
        </DialogTitle>
        <DialogContent
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TextField
            autoFocus
            margin="dense"
            label="OTP"
            sx={{ marginTop: 2 }}
            type="tel"
            inputRef={Otp}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalUpdate} style={{ color: "grey" }}>
            Edit Contact Number
          </Button>
          <Button onClick={handleUserVerifyOtp}>
            {isFetching ? <CircularProgress size="20px" /> : "Verify"}
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
              inputRef={userLoginContactRef}
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
            {isFetching ? <CircularProgress size="20px" /> : "Log In"}
          </Button>
          <span className="AlreadyHaveAnAccount">
            New To DuesTake ,
            <Link to="/signup">
              <span
                className="AlreadyHaveAnAccount"
                style={{
                  cursor: "pointer",
                  marginLeft: "10px",
                }}
              >
                Create Account
              </span>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
