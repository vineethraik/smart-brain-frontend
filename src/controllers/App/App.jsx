/**
 * route->
 *      home
 *      signout
 *      signin
 *      register
 *      leaderboard
 */

import React, { Component } from "react";

import Input from "../Input/Input";
import Loading from "../../containers/Loading/Loading";
import NavBar from "../../containers/NavBar/NavBar";
import Rank from "../../containers/Rank/Rank";
import Footer from "../../containers/Footer/Footer";
import About from "../../containers/About/About";
import Register from "../Register/Register";
import Signin from "../Signin/Signin";
import "./App.css";
import Image from "../../containers/Image/Image";
import Leaderboard from "../Leaderboard/Leaderboard";

export const backend = {
  // mainUrl: 'http://localhost:3000',
  mainUrl: "https://api.smartbrain.vrkcreations.in",
  // mainUrl: 'https://3efa-106-196-24-161.ngrok.io',
};

const initialState = {
  route: "init",
  user: {},
  imagedata: {
    url: "",
    boundingBoxes: [],
  },
};

export default class App extends Component {
  constructor(params) {
    super(params);
    this.state = initialState;
  }

  logout = () => {
    localStorage.clear();
    fetch(`${backend.mainUrl}/logout`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        userid: this.state.user.userid,
      }),
      headers: {
        Accept: "application/json,*/*",
        "Content-Type": "application/json",
      },
    })
      .then((out) => out.json())
      .then((out) => {
        this.changeRoute("signin");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  changeRoute = (route) => {
    switch (route) {
      case "home":
      case "leaderboard":
      case "profile":
      case "signin":
      case "register":
      case "loading":
      case "about":
        this.setState({ route: route });
        break;
      case "signout":
        localStorage.clear();
        this.logout();
        let state = initialState;
        state.route = "loading";
        this.setState(state);
        break;
      default:
        console.log("unknown route:", route);
    }
  };

  onSignin = (data) => {
    this.setState({ user: { ...data } });
    this.changeRoute("home");
    localStorage.setItem("userid", data.userid);
  };

  onImageDataChange = (data) => {
    this.setState({ imagedata: { ...data } });

    if (data.boundingBoxes.length > 0) {
      fetch(`${backend.mainUrl}/profile/${this.state.user.userid}`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json,*/*",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.status === "success") {
            this.setState({ user: { ...res.data } });
          } else {
            this.changeRoute("signin");
          }
        })
        .catch((err) => {
          console.log(err);
          this.changeRoute("signin");
        });
    }
    console.log(this.state);
  };

  componentDidMount = () => {
    const userid = localStorage.getItem("userid");
    if (this.state.route === "init") {
      if (userid && userid !== undefined) {
        let state = initialState;
        state.route = "loading";
        this.setState(state);
        fetch(`${backend.mainUrl}/profile/${userid}`, {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json,*/*",
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.status === "success") {
              this.changeRoute("home");
              this.setState({ user: { ...res.data } });
            } else {
              this.changeRoute("signin");
            }
          })
          .catch((err) => {
            console.log(err);
            this.changeRoute("signin");
          });
      } else {
        this.changeRoute("signin");
      }
    }
  };

  render() {
    return (
      <div className="app main">
        {this.state.route === "loading" ? (
          <>
            <Loading />
            <Footer changeRoute={this.changeRoute} />
          </>
        ) : this.state.route === "home" ? (
          <>
            <NavBar changeRoute={this.changeRoute} Route={"home"} />
            <Rank user={this.state.user} />
            <Input
              changeRoute={this.changeRoute}
              userid={this.state.user.userid}
              onImageDataChange={this.onImageDataChange}
            />
            <Image
              url={this.state.imagedata.url}
              boundingBoxes={this.state.imagedata.boundingBoxes}
            />
            <Footer changeRoute={this.changeRoute} />
          </>
        ) : this.state.route === "signin" ? (
          <>
            <NavBar changeRoute={this.changeRoute} Route={"signin"} />
            <Signin onSignin={this.onSignin} changeRoute={this.changeRoute} />
            <Footer changeRoute={this.changeRoute} />
          </>
        ) : this.state.route === "register" ? (
          <>
            <NavBar changeRoute={this.changeRoute} Route={"signin"} />
            <Register changeRoute={this.changeRoute} />
            <Footer changeRoute={this.changeRoute} />
          </>
        ) : this.state.route === "leaderboard" ? (
          <>
            <NavBar changeRoute={this.changeRoute} Route={"home"} />
            <Leaderboard
              changeRoute={this.changeRoute}
              user={this.state.user}
            />
            <Footer changeRoute={this.changeRoute} />
          </>
        ) : this.state.route === "about" ? (
          <>
            <NavBar changeRoute={this.changeRoute} Route={"about"} />
            <About />
          </>
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}
