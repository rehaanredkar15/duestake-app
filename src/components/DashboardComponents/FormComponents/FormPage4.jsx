import React, { useState, useEffect } from "react";
import { Button, CircularProgress, Grid, TextField } from "@material-ui/core";
import { handleSnackbar } from "../../../helpers/SnackbarHelper/SnackbarHelper";
import { GetUserDetails } from "../../../redux/actions/UserActions/getUserById";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UpdateLevel4 } from "../../../redux/actions/UserActions/UpdateUserByIdLevel4";
import { UpdateUserByIdByPanDetails } from "../../../redux/actions/UserActions/UpdateUserByPanDetails";
import debounce from "lodash.debounce";

const FormPage4 = ({ setPanCadLock, PanCadLock,setActiveStep }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [PanDetails, setPanDetails] = useState([]); // a string state variable to store the bank name
  const [bank, setBank] = useState(user.userBankName); // a string state variable to store the bank name
  const [ifsc, setIfsc] = useState(user.userBankIFSCCode); // a string state variable to store the IFSC code
  const [adharCard, setadharCard] = useState(user.userAdharCardNo); // a string state variable to store the Aadhar or PAN card number
  const [panCard, setpanCard] = useState(user.userPANNumber); // a string state variable to store the Aadhar or PAN card number
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isFetching, setisFetching] = useState(false);
  const [PanCardAPICalled, setPanCardAPICalled] = useState(false);

  // define functions to update the state variables

  function handleBankChange(event) {
    setBank(event.target.value);
  }

  function handleIfscChange(event) {
    setIfsc(event.target.value);
  }

  function handleAdharCardChange(event) {
    setadharCard(event.target.value);
  }

  const handlePanCall = (PanDetailsFetched) => {
    setisFetching(true);
    let formData = {
      userCity: PanDetailsFetched.CITY,
      userDOB: PanDetailsFetched.DOB,
      userFullName:PanDetailsFetched.FIRST_NAME +" " + PanDetailsFetched.MIDDLE_NAME +" " + PanDetailsFetched.LAST_NAME,
      userGender: PanDetailsFetched.GENDER,
      userAdharCardNo: PanDetailsFetched.AADHAR_NUM,
      userPANNumber: PanDetailsFetched.PAN,
      userPincode: PanDetailsFetched.PINCODE,
      userState: PanDetailsFetched.STATE,
    };
    const response = dispatch(UpdateUserByIdByPanDetails(user._id, formData));
    response.then(function (result) {
      console.log(result);
      if (result.success) {
        getUserDetails(user._id);
        handleSnackbar(true, "success", result.message, dispatch);
        setisFetching(false);
        setActiveStep(1);
      } else {
        setisFetching(false);
        handleSnackbar(
          true,
          "error",
          result.message
            ? result.message
            : "Updating User Failed " + result.message,
          dispatch
        );
      }
    });
  };
  console.log(PanCardAPICalled);

  const handlePanNetworkCall = (event) => {
    let pancardnumber = event.target.value.toUpperCase();
    console.log(pancardnumber)
    if (pancardnumber.length >= 10) {
      if (!PanCardAPICalled) {
        let formData = { panNumber: pancardnumber };
        fetch(`https://api.emptra.com/panCard/V2`, {
          method: "POST",
          headers: {
            clientId:
              "92f7844650561621951545f82f6c781d:63957e1217580417dc8c4143ff0d46f8",
            secretKey:
              "kRlrIFw8rrnEOdIRIAXWvBvsYAQtYXpYSD2WS2UzeWYKQ2l7XfPfft4vOyYHnGU2j",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
          .then((response) => response.json())
          .then((data) => {
        setPanCadLock(true);
        console.log(data);
        setPanDetails(data.result.data);
        handlePanCall(data.result.data);
          })
          .catch((error) => {
              console.error(error);
            });
          console.log("called");
          setPanCardAPICalled(true);
      }
    }

  }

    function handlePanChange(event) {
      setpanCard(event.target.value.toUpperCase());
      if(event.target.value.length>=10){
        handlePanNetworkCall(event);
      }
    }


  const getUserDetails = (Id) => {
    const res = dispatch(GetUserDetails(Id, navigate));
    res.then((result) => {
      if (result?.success) {
        console.log(result.data);
      } else {
        handleSnackbar(true, "error", "Failed to Fetch user details", dispatch);
      }
    });
  };

  const handleSubmit = (event) => {
    setisFetching(true);
    event.preventDefault();
    let formData = {
      userBankName: bank,
      userBankIFSCCode: ifsc,
      userPANNumber: panCard,
    };
    const response = dispatch(UpdateLevel4(user._id, formData));
    response.then(function (result) {
      console.log(result);
      if (result.success) {
        getUserDetails(user._id);
        handleSnackbar(true, "success", result.message, dispatch);
        setisFetching(false);
      } else {
        setisFetching(false);
        handleSnackbar(
          true,
          "error",
          result.message
            ? result.message
            : "Updating User Failed " + result.message,
          dispatch
        );
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={10}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Bank"
            fullWidth
            variant="outlined"
            value={bank}
            onChange={handleBankChange}
            defaultValue={user.userBankName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="IFSC"
            fullWidth
            variant="outlined"
            value={ifsc}
            onChange={handleIfscChange}
            defaultValue={user.userBankIFSCCode}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="PAN"
            fullWidth
            variant="outlined"
            Placeholder="Enter the Details In Capital Letters Only"
            disabled={PanCadLock}
            value={panCard}
            onChange={handlePanChange}
            defaultValue={user.userPANNumber}
          />
          <span style={{ color: "orange", fontSize: "14px" }}>
            Please Enter Pan Card Details Carefully You wont be able to change
            them{" "}
          </span>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Aadhaar"
            fullWidth
            variant="outlined"
            disabled={PanCadLock}
            value={adharCard}
            onChange={handleAdharCardChange}
            defaultValue={user.userAdharCardNo}
          />
        </Grid>
      </Grid>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isFetching}
        style={{ marginTop: 12 }}
      >
        {isFetching ? <CircularProgress size="20px" color="white" /> : "Submit"}
      </Button>
    </form>
  );
};

export default FormPage4;
