import React from "react";
import setAuthToken from "../services/setAuthToken";
import { connect } from "react-redux";
import { getCurrentUser } from "./../actions";

const Get_token = props => {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  localStorage.setItem("jwtToken", token);
  // setting auth token in axiox default headers
  setAuthToken(token);
  props.getCurrentUser();

  props.history.push("/");

  return <h1>Login in.....</h1>;
};

export default connect(
  null,
  { getCurrentUser }
)(Get_token);
