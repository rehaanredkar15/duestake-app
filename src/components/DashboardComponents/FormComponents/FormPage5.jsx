import React, { useState, useEffect, useCallback } from "react";
import {
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { cities } from "./cities";
import { states } from "./states";
import { handleSnackbar } from "../../../helpers/SnackbarHelper/SnackbarHelper";
import { GetUserDetails } from "../../../redux/actions/UserActions/getUserById";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UpdateLevel5 } from "../../../redux/actions/UserActions/UpdateUserByIdLevel5";
import '../DashboardFormComponent.css';


const FormPage5 = ({ onCompleted, setPanCadLock,PanCadLock  }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [employmentType, setEmploymentType] = useState(user.userSalariedStatus);
  const [designation, setDesignation] = useState(user.userDesignation);
  const [monthlyIncome, setMonthlyIncome] = useState(user.userMonthlyIncome);
  const [salaryMode, setSalaryMode] = useState(user.userModeOfSalary);
  const [companyName, setcompanyName] = useState(user.userCompanyName);
  const [companyType, setCompanyType] = useState(user.userCompanyType);
  const [industry, setIndustry] = useState(user.userCompanyIndustry);
  const [experience, setExperience] = useState(user.userExperienceInCompany);
  const [pincode, setPincode] = useState(user.userCompanyPincode);
  const [selectedCity, setSelectedCity] = useState(user.userCompanyCity);
  const [selectedState, setSelectedState] = useState(user.userCompanyState);
  const [interested, setInterested] = useState(false);
  const [Accepted, setAccepted] = useState(false);
  const [isFetching, setisFetching] = useState(false);
  const [options, setOptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleEmploymentTypeChange(event) {
    setEmploymentType(event.target.value);
  }

  function handleDesignationChange(event) {
    setDesignation(event.target.value);
  }

  function handleMonthlyIncomeChange(event) {
    setMonthlyIncome(event.target.value);
  }

  const debounce = (fn, delay) => {
    let timer;
    return function () {
      const args = arguments;
      const context = this;
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(context, args);
      }, delay);
    };
  };

  const handleSearch = useCallback(
    debounce((value) => {
      setSearchQuery(value);
    }, 1000),
    []
  );

  useEffect(() => {
    console.log(searchQuery);
    if (searchQuery.length>0) {
      let formData = { "companyName": searchQuery}
      fetch(`https://api.emptra.com/companySearch`,{
        method: 'POST',
        headers: {
          'clientId':'92f7844650561621951545f82f6c781d:63957e1217580417dc8c4143ff0d46f8',
          'secretKey': 'kRlrIFw8rrnEOdIRIAXWvBvsYAQtYXpYSD2WS2UzeWYKQ2l7XfPfft4vOyYHnGU2j',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(formData)
      },)
        .then((response) => response.json())
        .then((data) => {
          setOptions(data.message.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [searchQuery]);

  const handleCompanyNameChange = (event) => {
    setcompanyName(event.target.value);
    // handleSearch(event.target.value);
  };

  const handleSearchingCompany = (event) => {
    handleSearch(event.target.value);
  };
  
  const handleCompanyNameSelect = (event, value) => {
    setcompanyName(value ? value.name : "");
  };

  function handleSalaryModeChange(event) {
    setSalaryMode(event.target.value);
  }

  function handleCompanyTypeChange(event) {
    setCompanyType(event.target.value);
  }

  function handleIndustryChange(event) {
    setIndustry(event.target.value);
  }

  function handleExperienceChange(event) {
    setExperience(event.target.value);
  }

  function handleTermsConditions(event) {
    setAccepted(!Accepted);
  }

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

  const handleInterestChange = (event) => {
    setInterested(event.target.value);
  };

  const getUserDetails = (Id) => {
    const res = dispatch(GetUserDetails(Id, navigate));
    res.then((result) => {
      if (result?.success) {
        setAccepted(false);
      } else {
        handleSnackbar(true, "error", "Failed to Fetch user details", dispatch);
      }
    });
  };

  const handleSubmit = (event) => {
    setisFetching(true);
    event.preventDefault();
    let formData = {
      userSalariedStatus: employmentType,
      userDesignation: designation,
      userMonthlyIncome: monthlyIncome,
      userModeOfSalary: salaryMode,
      userCompanyName: companyName,
      userCompanyType: companyType,
      userCompanyIndustry: industry,
      userExperienceInCompany: experience,
      userCompanyPincode: pincode,
      userCompanyCity: selectedCity,
      userCompanyState: selectedState,
    };
    if (Accepted) {
      const response = dispatch(UpdateLevel5(user._id, formData));
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
    } else {
      handleSnackbar(
        true,
        "warning",
        "Please accept the terms and conditions",
        dispatch
      );
      setisFetching(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Employment Type</InputLabel>
            <Select
              value={employmentType}
              onChange={handleEmploymentTypeChange}
              defaultValue={user.userSalariedStatus}
              name="employmentType"
            >
              <MenuItem value="full-time">Full-Time</MenuItem>
              <MenuItem value="part-time">Part-Time</MenuItem>
              <MenuItem value="internship">Internship</MenuItem>
              <MenuItem value="selfemployed">Self-Employed</MenuItem>
              <MenuItem value="student">Student</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="designation"
            fullWidth
            label="Designation"
            variant="outlined"
            defaultValue={user.userDesignation}
            value={designation}
            onChange={handleDesignationChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="monthlyIncome"
            label="Monthly Income"
            variant="outlined"
            defaultValue={user.userMonthlyIncome}
            value={monthlyIncome}
            onChange={handleMonthlyIncomeChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Mode of Salary</InputLabel>
            <Select
              value={salaryMode}
              onChange={handleSalaryModeChange}
              name="modeOfSalary"
              defaultValue={user.userModeOfSalary}
            >
              <MenuItem value="Cash">Cash</MenuItem>
              <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
           {user.userCompanyName &&  (<><span className="companyName">Curret Company Name :  </span>{user.userCompanyName}</>) }
          <Autocomplete
            options={options}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
              {...params}
              // value={companyName}
              defaultValue={user.userCompanyName}
              onChange={handleSearchingCompany}
              label="Search company"
                variant="outlined"
              />
            )}
            onInputChange={handleSearch}
            onChange={handleCompanyNameSelect}
            // value={options.find((option) => console.log(option))}
            value={options.find((option) => option.name === companyName)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Company Type</InputLabel>
            <Select
              value={companyType}
              defaultValue={user.userCompanyType}
              onChange={handleCompanyTypeChange}
              name="companyType"
            >
              <MenuItem value="public">Public</MenuItem>
              <MenuItem value="private">Private</MenuItem>
              <MenuItem value="startup">Startup</MenuItem>
              <MenuItem value="non-profit">Non-Profit</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="industry"
            fullWidth
            label="Industry"
            variant="outlined"
            defaultValue={user.userCompanyIndustry}
            value={industry}
            onChange={handleIndustryChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="experience in current company "
            label="Experience"
            variant="outlined"
            fullWidth
            defaultValue={user.userExperienceInCompany}
            value={experience}
            onChange={handleExperienceChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Pincode"
            variant="outlined"
            value={pincode}
            // disabled={PanCadLock}
            fullWidth
            onChange={handlePincodeChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            options={cities}
            getOptionLabel={(option) => option}
            value={selectedCity}
            onChange={(event, value) => setSelectedCity(value)}
            renderInput={(params) => (
              <TextField {...params}  label="City" variant="outlined" />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            options={states}
            getOptionLabel={(option) => option}
            value={selectedState}
            onChange={(event, value) => setSelectedState(value)}
            renderInput={(params) => (
              <TextField {...params} label="State" variant="outlined"  
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="interest-label">
              Are you interested in a credit card?
            </InputLabel>
            <Select
              labelId="interest-label"
              id="interest"
              value={interested}
              onChange={handleInterestChange}
              label="Are you interested in a credit card?"
            >
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="primary" />}
            label="I agree to the Terms and Conditions"
            onChange={handleTermsConditions}
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

export default FormPage5;
