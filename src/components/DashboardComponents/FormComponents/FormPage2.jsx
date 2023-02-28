import React, { useState } from "react";
import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { TextField, Button, Typography } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetUserDetails } from "../../../redux/actions/UserActions/getUserById";
import { handleSnackbar } from "../../../helpers/SnackbarHelper/SnackbarHelper";
import { UpdateLevel1 } from "../../../redux/actions/UserActions/UpdateUserByIdLevel1";
import { UpdateLevel2 } from "../../../redux/actions/UserActions/UpdateUserByIdLevel2";
import { DatePicker } from "@material-ui/pickers";
import moment from "moment";



const FormPage2 = ({ onCompleted, setPanCadLock, PanCadLock }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [fullName, setFullName] = useState(user.userFullName); // a string state variable to store the person's full name
  const [maritalStatus, setMaritalStatus] = useState(user.userMaritalStatus);
  const [gender, setGender] = useState(user.userGender);
  let today = moment();
  let DOB = user.userDOB ? user.userDOB : today;
  const [selectedBirthDate, handleDateChange] = useState(new Date(DOB));
  const [monthlyExpense, setMonthlyExpense] = useState(user.userMonthlyExpense); // a number state variable to store the person's monthly expenses
  const [qualification, setQualification] = useState(user.userQualification); // a string state variable to store the person's highest qualification
  const [fatherName, setFatherName] = useState(user.userFatherName); // a string state variable to store the person's father's name
  const [motherName, setMotherName] = useState(user.userMotherName);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = React.useState({});
  const [isFetching, setisFetching] = useState(false);

  const handleMaritalStatusChange = (event) => {
    setMaritalStatus(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  function handleFullNameChange(event) {
    setFullName(event.target.value);
  }

  function handleMonthlyExpenseChange(event) {
    setMonthlyExpense(Number(event.target.value));
  }

  function handleQualificationChange(event) {
    setQualification(event.target.value);
  }

  function handleFatherNameChange(event) {
    setFatherName(event.target.value);
  }

  function handleMotherNameChange(event) {
    setMotherName(event.target.value);
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
      userFullName: fullName,
      userQualification: qualification,
      userFatherName: fatherName,
      userMotherName: motherName,
      userMaritalStatus: maritalStatus,
      userGender: gender,
      userDOB: selectedBirthDate,
      userMonthlyExpense: monthlyExpense,
    };
    const response = dispatch(UpdateLevel2(user._id, formData));
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

  console.log(user);

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Full Name As per Pan"
            name="FullName"
            defaultValue={user.userFullName}
            value={fullName}
            disabled={PanCadLock}
            onChange={handleFullNameChange}
            error={!!errors.firstName}
            helperText={errors.firstName}
            margin="normal"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePicker
            fullWidth
            // defaultValue={user.userDOb && new Date(user.userDOB)}
            style={{ marginTop: 12 }}
            disableFuture
            disabled={PanCadLock}
            inputVariant="outlined"
            openTo="year"
            format="DD/MM/YYYY"
            label="Date of birth"
            views={["year", "month", "date"]}
            value={selectedBirthDate}
            onChange={(date) => handleDateChange(date)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Gender</InputLabel>
            <Select
              value={gender}
              disabled={PanCadLock}
              defaultValue={user.userGender}
              onChange={handleGenderChange}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Marital Status</InputLabel>
            <Select
              value={maritalStatus}
              defaultValue={user.userMaritalStatus}
              onChange={handleMaritalStatusChange}
            >
              <MenuItem value="Single">Single</MenuItem>
              <MenuItem value="Married">Married</MenuItem>
              <MenuItem value="Divorced">Divorced</MenuItem>
              <MenuItem value="Widowed">Widowed</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="MonthlyExpense"
            name="MonthlyExpense"
            defaultValue={user.userMonthlyExpense}
            value={monthlyExpense}
            onChange={handleMonthlyExpenseChange}
            error={!!errors.email}
            helperText={errors.email}
            margin="normal"
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Qualification"
            name="Qualification"
            value={qualification}
            defaultValue={user.userQualification}
            onChange={handleQualificationChange}
            error={!!errors.email}
            helperText={errors.email}
            margin="normal"
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Father's Name"
            name="Father's Name"
            value={fatherName}
            defaultValue={user.userFatherName}
            onChange={handleFatherNameChange}
            error={!!errors.email}
            helperText={errors.email}
            margin="normal"
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Mother's Name"
            name="Mother's Name"
            value={motherName}
            defaultValue={user.userMotherName}
            onChange={handleMotherNameChange}
            error={!!errors.email}
            helperText={errors.email}
            margin="normal"
            fullWidth
            variant="outlined"
          />
        </Grid>
      </Grid>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isFetching}
        style={{ marginTop: 20 }}
      >
        {isFetching ? <CircularProgress size="20px" color="white" /> : "Submit"}
      </Button>
    </form>
  );
};

export default FormPage2;
