import React, { Component } from "react";
import "./App.css";
import Login from "./Components/Login";
import ParticlesBg from "particles-bg";
import { BrowserRouter, Route } from "react-router-dom";
import Profile from "./Components/Profile";
import Game from "./Components/Game";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <div id="particles-js">
          <ParticlesBg type="circle" bg={true} />
        </div>
        <div>
          <div className="App">
            <BrowserRouter>
              <Route exact path="/" component={Login} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/game" component={Game} />
            </BrowserRouter>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
