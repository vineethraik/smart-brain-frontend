import React, { Component } from "react";
import { backend } from "../App/App";
import "./Signin.css";

const initialState = {
  emailField: "",
  passwordField: "",
  error: {
    active: false,
    value: "Error",
    op1: 0.2,
    op2: 1,
  },
};

export default class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  changeErrorState = (active, value = "") => {
    this.setState({
      error: {
        active: active,
        value: value,
        op1: 0.2,
        op2: 1,
      },
    });
  };

  onFieldChange = (target) => (event) => {
    switch (target) {
      case "email":
        this.setState({ emailField: event.target.value });
        break;
      case "password":
        this.setState({ passwordField: event.target.value });
        break;

      default:
        break;
    }
  };

  sendVerificationMail = (userid) => {
    fetch(`${backend.mainUrl}/verify/sendmail`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        userid: userid,
      }),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    })
      .then((out) => out.json())
      .then((out) => {
        console.log(out);
      });
  };

  onClickedSignin = () => {
    const { emailField, passwordField } = this.state;
    const { onSignin, changeRoute } = this.props;

    this.changeErrorState(true, "Signingin");

    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(emailField)) {
      if (passwordField.length >= 8) {
        fetch(`${backend.mainUrl}/signin`, {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({
            email: emailField,
            password: passwordField,
          }),
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            this.changeErrorState(false);
            if (res.status === "success") {
              onSignin(res.data);
            } else {
              switch (res.code) {
                case "00":
                  alert("Wrong credentials,try again");
                  break;
                case "01":
                  this.sendVerificationMail(res.userid);
                  alert(
                    "Email verification incomplete,email sent please check your mailbox"
                  );
                  this.setState({ emailField: "" });
                  changeRoute("loading");
                  setTimeout(() => {
                    changeRoute("signin");
                  }, 0.5);
                  break;
                default:
                  alert("Unknown error");
              }
            }
          })
          .catch((err) => {
            this.changeErrorState(false);
            console.log(err);
          });
      } else {
        this.changeErrorState(false);
        alert("password should be of 8 or more characters");
      }
    } else {
      this.changeErrorState(false);
      alert("Enter a Valid email address");
    }
  };

  render() {
    return (
      <div className="signin main">
        <div
          className="signin form"
          style={
            this.state.error.active
              ? { opacity: this.state.error.op1 }
              : { opacity: 1 }
          }
        >
          <p className="signin title">SignIn</p>
          <label className="signin element" htmlFor="signinEmail">
            Email
          </label>
          <input
            onChange={this.onFieldChange("email")}
            className="signin element"
            type="email"
            name=""
            id="signinEmail"
          />
          <label className="signin element" htmlFor="signinPassword">
            Password
          </label>
          <input
            onChange={this.onFieldChange("password")}
            className="signin element"
            type="password"
            name=""
            id="signinPassword"
          />
          <p onClick={this.onClickedSignin} className="signin button">
            Signin
          </p>
        </div>
        {this.state.error.active ? (
          <div className="signin error">
            <p>{this.state.error.value}</p>
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }
}
