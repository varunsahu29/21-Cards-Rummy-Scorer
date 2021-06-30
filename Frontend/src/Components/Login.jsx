import React, { Component } from "react";
import axios from "axios";
import cookie from "react-cookies";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: {
        username: "",
        password: "",
      },
      credText: "",
    };
    cookie.remove("tokenid");
  }
  handleChange = (evt) => {
    let cred = this.state.credentials;
    cred[evt.target.name] = evt.target.value;
    this.setState({ credentials: cred });
  };
  login = () => {
    axios
      .post("http://127.0.0.1:8000/auth/", this.state.credentials)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          cookie.save("tokenid", res.data.token, { path: "/" });
          cookie.save("username", this.state.credentials.username, {
            path: "/",
          });
          window.location = "/Profile";
        } else {
          this.setState({ credText: "Oops! Wrong username or password!" });
        }
      })
      .catch(this.setState({ credText: "Oops! Wrong username or password!" }));
  };

  render() {
    return (
      <header id="home">
        <div className="row banner">
          <div className="banner-text">
            <div className="responsive-headline">
              {this.state.credText && <h1>{this.state.credText}</h1>}
              <label htmlFor="UserName">
                <h3>Username</h3>
              </label>
              <input
                type="text"
                defaultValue=""
                size="35"
                id="UserName"
                name="username"
                onChange={this.handleChange}
              />
            </div>
            <div className="responsive-headline">
              <label htmlFor="Password">
                <h3>Password</h3>
              </label>
              <input
                type="password"
                defaultValue=""
                size="35"
                id="password"
                name="password"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <button className="submit" onClick={this.login}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Login;
