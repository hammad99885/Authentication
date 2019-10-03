import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import rootReducer from "./reducer/index";
import { getCurrentUser } from "./actions/index"
import setAuthToken from "./services/setAuthToken"

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

//checking if token existed in local storage
if(localStorage.jwtToken) {
  //seting token in default axios header 
  setAuthToken(localStorage.jwtToken);

  // calling setcurrenuser function from action/index.js
  store.dispatch(getCurrentUser());

}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("app")
);


// const currentTime = Date.now() / 1000;
// // checking if token is not expired
// if(decoded.exp < currentTime) {
//   // store.dispatch(logoutUser());
  
//   window.location.href = '/'
// }