// Login.js

import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "./../actions/index";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };

  // handel input change
  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentDidMount() {
    // check if user is athuntecated or not and redirecting
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    //   check if user is athun
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }
    // checking if nextProps has errors and setting in state
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(user);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="container" style={{ marginTop: "50px", width: "700px" }}>
        <h2 style={{ marginBottom: "40px" }}>Login</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              className={`form-control form-control-lg ${
                errors.hasOwnProperty("email") ? "is-invalid" : " "
              }`}
              name="email"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
            {/* display email erroor if occured */}
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
                errors.hasOwnProperty("password") ? "is-invalid" : ""
              }`}
              name="password"
              onChange={this.handleInputChange}
              value={this.state.password}
              onChange={this.handleInputChange}
            />
            {/* display password error if occured */}
            {errors.hasOwnProperty("password") ? (
              <div className="invalid-feedback">{errors.password}</div>
            ) : (
              ""
            )}
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Login User
            </button>
          </div>
        </form>
        <div className="row justify-content-center">
          <div className="col-6">
            <a href="http://localhost:3000/user/google">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTirYaaw64Tm7SLyuA5vtOy1DL0prOg9Fx7A1cNbCmfpVxXHw7G"
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
                src="https://blog.dashlane.com/wp-content/uploads/2018/03/facebook-sign-in-button.png"
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

//https://blog.dashlane.com/wp-content/uploads/2018/03/facebook-sign-in-button.png

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);

// state = {
//     email: "",
//     password: "",
//     error: {}
// }

// handleInputChange(e) {
//     this.setState({
//         [e.target.name]: e.target.value
//     })
// }

// handleSubmit(e) {
//     e.preventDefault();
//     const user = {
//         email: this.state.email,
//         password: this.state.password,
//     }
//     this.props.loginUser(user);
// }

// componentDidMount() {
//     if(this.props.auth.isAuthenticated) {
//         this.props.history.push('/');
//     }
// }

// componentWillReceiveProps(nextProps) {
//     if(nextProps.auth.isAuthenticated) {
//         this.props.history.push('/')
//     }
//     if(nextProps.errors) {
//         this.setState({
//             errors: nextProps.errors
//         });
//     }
// }
