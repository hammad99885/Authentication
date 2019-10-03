// Register.js

import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { registerUser } from "./../actions/index";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password_confirm: "",
    errors: {}
  };
  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  componentWillReceiveProps(nextProps) {
    //checking if user if not already athenticated and redirecting
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }
    // checking next props for error and if existed add in state
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password_confirm: this.state.password_confirm
    };
    this.props.registerUser(user, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="container" style={{ marginTop: "50px", width: "700px" }}>
        <h2 style={{ marginBottom: "40px" }}>Registration</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              className={`form-control form-control-lg ${
                errors.hasOwnProperty("name") ? "is-invalid" : " "
              }`}
              name="name"
              onChange={this.handleInputChange}
              value={this.state.name}
            />
            {errors.hasOwnProperty("name") ? (
              <div className="invalid-feedback">{errors.name}</div>
            ) : (
              ""
            )}
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              className={`form-control form-control-lg ${
                errors.hasOwnProperty("email") ? "is-invalid" : " "
              }`}
              name="email"
              onChange={this.handleInputChange}
              value={this.state.email}
            />
            {errors.hasOwnProperty("email") ? (
              <div className="invalid-feedback">{errors.email}</div>
            ) : (
              ""
            )}
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              className={`form-control form-control-lg ${
                errors.hasOwnProperty("password") ? "is-invalid" : " "
              }`}
              name="password"
              onChange={this.handleInputChange}
              value={this.state.password}
            />
            {errors.hasOwnProperty("password") ? (
              <div className="invalid-feedback">{errors.password}</div>
            ) : (
              ""
            )}
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              className={`form-control form-control-lg ${
                errors.hasOwnProperty("password_confirm") ? "is-invalid" : " "
              }`}
              name="password_confirm"
              onChange={this.handleInputChange}
              value={this.state.password_confirm}
            />
            {errors.hasOwnProperty("password_confirm") ? (
              <div className="invalid-feedback">{errors.password_confirm}</div>
            ) : (
              ""
            )}
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Register User
            </button>
          </div>
        </form>
        <div className="row justify-content-center">
          <div className="col-6">
            <a href="http://localhost:3000/user/google">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ_ZKeLFVnJYS1XCh3xt3v1PKz-41qvAA1154juCaCOJkvhPUmj"
                alt=""
                style={{ width: "100%" }}
              />
            </a>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-6">
            <a href="http://localhost:3000/user/facebook">
              <img
                src="http://chatimecafe.com/images/FacebookButtonReg.png"
                alt=""
                style={{ width: "100%" }}
              />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

//http://chatimecafe.com/images/FacebookButtonReg.png

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));

// handleSubmit(e) {
//     e.preventDefault();
//     const user = {
//       name: this.state.name,
//       email: this.state.email,
//       password: this.state.password,
//       password_confirm: this.state.password_confirm
//     };
//     this.props.registerUser(user, this.props.history);
//   }

//   componentWillReceiveProps(nextProps) {
//     if (nextProps.auth.isAuthenticated) {
//       this.props.history.push("/");
//     }
//     if (nextProps.errors) {
//       this.setState({
//         errors: nextProps.errors
//       });
//     }
//   }

//   componentDidMount() {
//     if (this.props.auth.isAuthenticated) {
//       this.props.history.push("/");
//     }
//   }
