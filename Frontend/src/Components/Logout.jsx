import React, { Component } from "react";
import cookie from "react-cookies";
import "./logout.css";
class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  logout = () => {
    cookie.remove("tokenid");
    cookie.remove("username");
    cookie.remove("game", { path: "/Game" });
    window.location.replace("/");
  };
  render() {
    return (
      <div>
        <button className="right" onClick={this.logout}>
          Logout
        </button>
      </div>
    );
  }
}

export default Logout;
