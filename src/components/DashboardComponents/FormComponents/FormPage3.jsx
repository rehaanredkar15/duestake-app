import React, { useState } from "react";
import {
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
  CircularProgress,
} from "@material-ui/core";
import Autocomplete from "@mui/material/Autocomplete";
import { cities } from "./cities.js";
import { states } from "./states.js";
import { GetUserDetails } from "../../../redux/actions/UserActions/getUserById";
import { handleSnackbar } from "../../../helpers/SnackbarHelper/SnackbarHelper";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UpdateLevel3 } from "../../../redux/actions/UserActions/UpdateUserByIdLevel3";






const FormPage3 = ({ onCompleted, setPanCadLock,PanCadLock }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [pincode, setPincode] = useState(user.userPincode);
  const [selectedState, setSelectedState] = useState(user.State);
  const [selectedCity, setSelectedCity] = useState(user.City);
  const [residentType, setResidentType] = useState(user.userResidentType);
  const [isFetching, setisFetching] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleResidentTypeChange = (event) => {
    setResidentType(event.target.value);
  };
  
  const handlePincodeChange = (event) => {
    const { value } = event.target;
    setPincode(value);
    fetch(`https://api.postalpincode.in/pincode/${value}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data[0] && data[0].PostOffice) {
          setSelectedState(data[0].PostOffice[0].State);
          setSelectedCity(data[0].PostOffice[0].District);
        } else {
          setSelectedState("");
          setSelectedCity("");
        }
      })
      .catch((error) => {
        setSelectedState("");
        setSelectedCity("");
      });
  };

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
      userPincode: pincode,
      userState: selectedState,
      userCity: selectedCity,
      userResidentType: residentType,
    };
    const response = dispatch(UpdateLevel3(user._id, formData));
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
            label="Pincode"
            variant="outlined"
            value={pincode}
            disabled={PanCadLock}
            defaultValue={user.userPincode}
            fullWidth
            onChange={handlePincodeChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Resident Type</InputLabel>
            <Select
              value={residentType}
              onChange={handleResidentTypeChange}
              fulllWidth
            >
              <MenuItem value="Rental">Tenant</MenuItem>
              <MenuItem value="SelfOwned">Self Owned</MenuItem>
              <MenuItem value="ParentsOwned">Parent Owned</MenuItem>
              <MenuItem value="SiblingsOwned">Siblings Owned</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            options={states}
            getOptionLabel={(option) => option}
            value={selectedState}
            disabled={PanCadLock}
            defaultValue={user.userState}
            onChange={(event, value) => setSelectedState(value)}
            renderInput={(params) => (
              <TextField {...params}  disabled={PanCadLock}
              label="State" variant="outlined" />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6} fulllWidth>
          <Autocomplete
            options={cities}
            getOptionLabel={(option) => option}
            value={selectedCity}
            disabled={PanCadLock}
            defaultValue={user.userCity}
            onChange={(event, value) => setSelectedCity(value)}
            renderInput={(params) => (
              <TextField {...params}     disabled={PanCadLock}
              label="City" variant="outlined" />
            )}
          />
        </Grid>
      </Grid>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isFetching}
        style={{ marginTop: 40 }}
      >
          {isFetching ? <CircularProgress size="20px" color="white" /> : "Submit"}
      </Button>
    </form>
  );
};

export default FormPage3;
