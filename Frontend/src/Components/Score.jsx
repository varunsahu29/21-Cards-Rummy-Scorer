import React, { Component } from "react";
class Score extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: this.props["score"],
    };
  }
  render() {
    return this.state.games.map((game) => <h4>{game}</h4>);
  }
}

export default Score;
