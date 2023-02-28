import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import Store from "./redux/store";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
// import DateFnsUtils from "@date-io/date-fns";
import MomentUtils from '@date-io/moment';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <MuiPickersUtilsProvider utils={MomentUtils}>
    <Provider store={Store}>
      <App />
    </Provider>
  </MuiPickersUtilsProvider>
);
