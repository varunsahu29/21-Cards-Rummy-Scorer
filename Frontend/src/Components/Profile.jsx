import React, { Component } from "react";
import Logout from "./Logout";
import axios from "axios";
import cookie from "react-cookies";
import Display from "./Display";
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: cookie.load("tokenid"),
      username: "",
      games: "",
    };
  }
  componentDidMount() {
    axios
      .get("http://127.0.0.1:8000/api/Player/", {
        headers: {
          Authorization: `Token ${this.state.token}`,
        },
      })
      .then((res) => {
        this.setState({ username: res.data.user["username"] });
        this.setState({ games: res.data["games"] });
      })
      .catch((error) => console.log(error));
  }
  createnew = () => {
    axios
      .post(
        "http://127.0.0.1:8000/api/GameFour/",
        { t1: 0, t2: 0, t3: 0, t4: 0 },
        { headers: { Authorization: `Token ${this.state.token}` } }
      )
      .then((res) => {
        cookie.save("game", res.data["games"], { path: "/Game" });
        window.location = "/Game";
      })
      .catch((error) => console.log(error));
  };
  render() {
    return (
      <div>
        <div className="row banner">
          <div className="banner-text">
            <div className="responsive-headline">
              <Logout />
            </div>
          </div>
        </div>
        <header id="home">
          <div className="row banner">
            <div className="banner-text">
              <div className="responsive-headline">
                <h1>Profile Page for {this.state.username}</h1>
                <button
                  type="button"
                  class="btn btn-outline-danger btn-lg"
                  onClick={this.createnew}
                >
                  Create New
                </button>
                {this.state.games && <Display games={this.state.games} />}
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default Profile;
