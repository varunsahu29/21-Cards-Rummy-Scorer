import React, { Component } from "react";
import cookie from "react-cookies";
class display extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: this.props.games,
    };
  }
  t = (id, datee) => {
    let dateee = id + " " + datee.slice(5, 10) + " " + datee.slice(12, 16);
    return dateee;
  };
  togame = (prop) => {
    cookie.save("game", prop, { path: "/Game" });
    window.location = "/Game";
  };
  render() {
    return (
      <div>
        {this.state.games.map((game) => (
          <div key={game.id}>
            <button
              type="button"
              class="btn btn-outline-danger btn-lg"
              onClick={() => this.togame(game)}
            >
              {this.t(game.id, game.start)}
            </button>
            <br />
          </div>
        ))}
      </div>
    );
  }
}

export default display;
