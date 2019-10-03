import React, { Component } from "react";
import { Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Nav from "./NavBar";
import Get_token from "./Get_token";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Nav />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/get_token" component={Get_token} />
      </React.Fragment>
    );
  }
}

export default App;
