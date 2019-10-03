import axios from "axios";
import setAuthToken from "./../services/setAuthToken";

export const registerUser = (user, history) => dispatch => {
  axios
    .post("http://localhost:3000/user/register", user)
    .then(res => history.push("/login"))
    .catch(err => {
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data
      });
    });
};

export const loginUser = user => dispatch => {
  axios
    .post("http://localhost:3000/user/login", user)
    .then(res => {
      const { token } = res.data;

      //setting auth token in local storage
      localStorage.setItem("jwtToken", token);

      // setting auth token in axiox default headers
      console.log(token)
      setAuthToken(token);
      dispatch(getCurrentUser());
    })
    .catch(err => {
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data
      });
    });
};

export const getCurrentUser = () => dispatch => {
  axios.get("http://localhost:3000/user/me").then(res => {
    dispatch({
      type: "SET_CURRENT_USER",
      payload: res.data
    });
  });
};


export const logoutUser = (history) => dispatch => {
  localStorage.removeItem('jwtToken');
  console.log(localStorage.getItem("jwt"))
  setAuthToken(false);
  dispatch({
    type: "LOGOUT_USER"
  });
  if(history)  history.push('/login');
}