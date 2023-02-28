import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  StepIcon,
  Grid,
} from "@material-ui/core";
import FormPage1 from "./FormComponents/FormPage1";
import FormPage2 from "./FormComponents/FormPage2";
import FormPage3 from "./FormComponents/FormPage3";
import FormPage4 from "./FormComponents/FormPage4";
import FormPage5 from "./FormComponents/FormPage5";
import { Check } from "@material-ui/icons";
import "./DashboardFormComponent.css";


const steps = [
  { label: "Personal Information", completed: false },
  { label: "Employment Information", completed: false },
  { label: "Confirmation", completed: false },
];

const DashboardFormComponent = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [activeStep, setActiveStep] = React.useState(0);
  const [PanCadLock, setPanCadLock] = React.useState(false);
  const [completed, setCompleted] = React.useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleCompleted = (page) => {
    const newCompleted = [...completed];
    newCompleted[page] = true;
    setCompleted(newCompleted);
  };

  const steps = [1, 2, 3, 4, 5];

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <FormPage1 onCompleted={() => handleCompleted(step)} setPanCadLock={setPanCadLock} PanCadLock={PanCadLock} />;
      case 1:
        return <FormPage2 onCompleted={() => handleCompleted(step)} setPanCadLock={setPanCadLock} PanCadLock={PanCadLock}/>;
      case 2:
        return <FormPage3 onCompleted={() => handleCompleted(step)} setPanCadLock={setPanCadLock} PanCadLock={PanCadLock}/>;
      case 3:
        return <FormPage4 onCompleted={() => handleCompleted(step)} setPanCadLock={setPanCadLock} PanCadLock={PanCadLock} setActiveStep={setActiveStep}/>;
      case 4:
        return <FormPage5 onCompleted={() => handleCompleted(step)} setPanCadLock={setPanCadLock} PanCadLock={PanCadLock} tw/>;
      default:
        return null;
    }
  };

  console.log(user.userInformationLevel)
  const handleCompleteCheck = (page) => {
   
    if (user.userInformationLevel.includes(page)) {
      return true;
    } else {
      return false;
    }
  };

  const handleChangeStep = () => {
    if(activeStep<4){
      setActiveStep(activeStep + 1)
    }
    else {
      setActiveStep(0)
    }
  }

  return (
    <Grid container direction="column">
      <Grid item xs={12}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label} onClick={handleStep(index)}>
              <StepLabel completed={handleCompleteCheck(label)}>
                {completed[index] && <Check />}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Grid>
      <Grid item xs={12}>
        <div className="OnboardingPageContainer">
          {getStepContent(activeStep)}
        </div>
      </Grid>
      <Grid item xs={12} container justify="space-between" alignItems="center">
        <Grid item>
          {activeStep !== 0 && (
            <Button onClick={() => setActiveStep(activeStep - 1)}>
              Previous
            </Button>
          )}
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={handleChangeStep}
          >
            Next
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DashboardFormComponent;
