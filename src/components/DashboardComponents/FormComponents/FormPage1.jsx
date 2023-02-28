import React, { useState } from "react";
import { CircularProgress, FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { TextField, Button, Typography } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { UpdateLevel1 } from "../../../redux/actions/UserActions/UpdateUserByIdLevel1";
import {handleSnackbar} from '../../../helpers/SnackbarHelper/SnackbarHelper';
import { useNavigate } from "react-router-dom";
import { GetUserDetails } from "../../../redux/actions/UserActions/getUserById";
import { useEffect } from "react";


const loanTypes = ["Home Loan", "Personal Loan", "Car Loan"];

const FormPage1 = ({ onCompleted, setPanCadLock,PanCadLock }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [loanType, setLoanType] = useState(user.userLoanType);
  const [loanAmount, setLoanAmount] = useState(user.userLoanAmount);
  const [loanTenure, setLoanTenure] = React.useState(user.userLoanTenure);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isFetching, setisFetching] = useState(false);

  const handleChange = (event) => {
    setLoanTenure(event.target.value);
  };

  const handleLoanTypeChange = (event) => {
    setLoanType(event.target.value);
  };

  const handleLoanAmountChange = (event) => {
    setLoanAmount(event.target.value);
  };
  
  const getUserDetails = (Id) => {
    const res = dispatch(GetUserDetails(Id,navigate));
    res.then((result) => {
      if (result?.success) {
        console.log(result.data);
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


  useEffect(() => {
    if(user.userPANNumber.length>0){
      setPanCadLock(true);
    }
  }, [user])
  
  console.log(PanCadLock)


  const handleSubmit = (event) => {
    setisFetching(true);
    event.preventDefault();
    let formData = {
      userLoanType:loanType,
      userLoanAmount:loanAmount,
      userLoanTenure:loanTenure
    }
    const response = dispatch(UpdateLevel1(user._id,formData));
      response.then(function (result) {
        console.log(result);
        if (result.success) {
          getUserDetails(user._id)
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

  console.log(user)

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={10}>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            label="Loan Type"
            defaultValue={user.userLoanType}
            value={loanType}
            onChange={handleLoanTypeChange}
            variant="outlined"
            fullWidth
          >
            {loanTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Loan Amount"
            defaultValue={user.userLoanAmount}
            value={loanAmount}
            type="number"
            InputProps={{ inputProps: { min: 0, max: 580000 } }}
            onChange={handleLoanAmountChange}
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl  fullWidth variant="outlined">
            <InputLabel id="loan-tenure-label">Loan Tenure</InputLabel>
            <Select
              labelId="loan-tenure-label"
              id="loan-tenure"
              defaultValue={user.userLoanTenure}
              value={loanTenure}
              onChange={handleChange}
            >
              <MenuItem value={6}>6 months</MenuItem>
              <MenuItem value={12}>12 months</MenuItem>
              <MenuItem value={24}>24 months</MenuItem>
              <MenuItem value={36}>36 months</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary"  disabled={isFetching}>
          {isFetching ? <CircularProgress size="20px" color="white" /> : "Submit"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default FormPage1;
