import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
// import { setSnackbar } from "./redux/ducks/snackbar";
import {ChangeSnackbar} from '../../Redux/Actions/SnackbarActions/SnackbarActions.js';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  }
}));

const CustomizedSnackbars = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const snackbarOpen = useSelector(state => state.snackBarState?.snackbarOpen);
  const snackbarType = useSelector(state => state.snackBarState?.snackbarType);
  const snackbarMessage = useSelector(state => state.snackBarState?.snackbarMessage);

  
  const snackbarDetails = {
    snackbarOpen:false, 
    snackbarMessage:snackbarMessage,
     snackbarType: snackbarType
   }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(ChangeSnackbar(snackbarDetails));
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div className={classes.root}>
     <Snackbar open={snackbarOpen} autoHideDuration={1700} onClose={handleClose}  anchorOrigin={  {vertical: 'top',horizontal: 'center'}} >
        <Alert onClose={handleClose} severity={snackbarType} sx={{ width: '100%' }}>
        {snackbarMessage}
        </Alert>
      </Snackbar>
       
    </div>
  );
};

export default CustomizedSnackbars;