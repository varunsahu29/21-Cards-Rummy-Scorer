import React, { Component } from "react";
import cookie from "react-cookies";
import Logout from "./Logout";
import axios from "axios";
import "./Game.css";
import Score from "./Score";
class Game extends Component {
  constructor(props) {
    super(props);
    let game = cookie.load("game");
    this.state = {
      username: cookie.load("username"),
      game_id: game["id"],
      game_time: game["start"].slice(0, 10) + " " + game["start"].slice(11, 16),
      score: {
        game_t4: "0-0",
        game_t3: "0-0",
        game_t1: "0-0",
        game_t2: "0-0",
      },
      send: {
        s1: 0,
        s2: 0,
        s3: 0,
        s4: 0,
      },
      p1_name: "Player 1",
      p2_name: "Player 2",
      p3_name: "Player 3",
      p4_name: "Player 4",
      p1: 0,
      p2: 0,
      p3: 0,
      p4: 0,
      shower: "1",
      token: cookie.load("tokenid"),
      player1: [],
      player2: [],
      player3: [],
      player4: [],
    };
    // console.log(this.state);
  }
  componentDidMount() {
    axios
      .post(
        "http://127.0.0.1:8000/api/GameFourEntry/",
        {
          body: {
            record: this.state.send,
          },
          game: cookie.load("game"),
          save: 0,
        },
        { headers: { Authorization: `Token ${this.state.token}` } }
      )
      .then((res) => {
        for (let i = 0; i < res.data.length; ++i) {
          this.state.player1.push(res.data[i].s1);
          this.state.player2.push(res.data[i].s2);
          this.state.player3.push(res.data[i].s3);
          this.state.player4.push(res.data[i].s4);
        }
      })
      .catch((error) => console.log(error));
  }
  submit = () => {
    let n1 = new Float32Array(5);
    let n2 = new Float32Array(5);
    let str = this.state.score.game_t1;
    let res = str.split("-");
    n1[1] = parseFloat(res[0]);
    n2[1] = parseFloat(res[1]);
    str = this.state.score.game_t2;
    res = str.split("-");
    n1[2] = parseFloat(res[0]);
    n2[2] = parseFloat(res[1]);
    str = this.state.score.game_t3;
    res = str.split("-");
    n1[3] = parseFloat(res[0]);
    n2[3] = parseFloat(res[1]);
    str = this.state.score.game_t4;
    res = str.split("-");
    n1[4] = parseFloat(res[0]);
    n2[4] = parseFloat(res[1]);
    let score = new Float32Array(5);
    let s = n2[1] + n2[2] + n2[3] + n2[4];
    let l = n1[1] + n1[2] + n1[3] + n1[4];
    for (let i = 1; i < 5; ++i) {
      if (i === Number(this.state.shower)) {
        console.log(i);
        score[i] = 4 * n2[i] - s + l;
      } else {
        score[i] = 4 * n2[i] - s - n1[i];
      }
    }
    this.setState({ s1: score[1] });
    this.setState({ s3: score[2] });
    this.setState({ s2: score[3] });
    this.setState({ s4: score[4] });
    let cur = this.state.send;
    cur["s1"] = score[1];
    cur["s2"] = score[2];
    cur["s3"] = score[3];
    cur["s4"] = score[4];
    this.state.player1.unshift(score[1]);
    this.state.player2.unshift(score[2]);
    this.state.player3.unshift(score[3]);
    this.state.player4.unshift(score[4]);
    this.setState({ send: cur });
    axios
      .post(
        "http://127.0.0.1:8000/api/GameFourEntry/",
        {
          body: {
            record: this.state.send,
          },
          game: cookie.load("game"),
          save: 1,
        },
        { headers: { Authorization: `Token ${this.state.token}` } }
      )
      .then((res) => {
        let cur = this.state.p1;
        cur = res.data.t1;
        console.log(cur);
        this.setState({ p1: cur });

        cur = this.state.p2;
        cur = res.data.t2;
        this.setState({ p2: cur });

        cur = this.state.p3;
        cur = res.data.t3;
        this.setState({ p3: cur });

        cur = this.state.p4;
        cur = res.data.t4;
        this.setState({ p4: cur });
      })
      .catch((error) => console.log(error));
  };
  handleChange = (prop) => {
    this.setState({ shower: prop });
  };
  handleChange2 = (evt) => {
    let cur = this.state.score;
    cur[evt.target.name] = evt.target.value;
    this.setState({ score: cur });
  };
  render() {
    return (
      <div>
        <Logout />
        <div className="rb">
          <div className="banner-text">
            <div className="responsive-headline">
              <input
                type="radio"
                className="Radios"
                name="blankRadio"
                id="blankRadio1"
                value="1"
                aria-label="..."
                onChange={() => {
                  this.handleChange("1");
                }}
              />
              <h3>{this.state.p1_name}:</h3>
              <h3>{this.state.p1}</h3>
              <input
                type="tel"
                defaultValue=""
                size="33"
                id="UserName1"
                name="game_t1"
                placeholder="Point-Maal"
                onChange={this.handleChange2}
              />
              <br />
              <br />
            </div>
            <div className="responsive-headline">
              <input
                type="radio"
                className="Radios"
                name="blankRadio"
                id="blankRadio1"
                value="1"
                aria-label="..."
                onChange={() => {
                  this.handleChange("2");
                }}
              />
              <h3>{this.state.p2_name}:</h3>
              <h3>{this.state.p2}</h3>
              <input
                type="tel"
                defaultValue=""
                size="33"
                id="UserName2"
                name="game_t2"
                placeholder="Point-Maal"
                onChange={this.handleChange2}
              />
              <br />
              <br />
            </div>
            <div className="responsive-headline">
              <input
                type="radio"
                className="Radios"
                name="blankRadio"
                id="blankRadio1"
                value="1"
                aria-label="..."
                onChange={() => {
                  this.handleChange("3");
                }}
              />
              <h3>{this.state.p3_name}:</h3>
              <h3>{this.state.p3}</h3>
              <input
                type="tel"
                defaultValue=""
                size="33"
                id="UserName3"
                name="game_t3"
                placeholder="Point-Maal"
                onChange={this.handleChange2}
              />
              <br />
              <br />
            </div>
            <div className="responsive-headline">
              <input
                type="radio"
                className="Radios"
                name="blankRadio"
                id="blankRadio1"
                value="1"
                aria-label="..."
                onChange={() => {
                  this.handleChange("4");
                }}
              />
              <h3>{this.state.p4_name}:</h3>
              <h3>{this.state.p4}</h3>
              <input
                type="tel"
                defaultValue=""
                size="33"
                id="UserName4"
                name="game_t4"
                placeholder="Point-Maal"
                onChange={this.handleChange2}
              />
              <br />
              <br />
              <button className="submit" onClick={this.submit}>
                Submit
              </button>
            </div>
            <div>
              <div className="cool">
                <h4>{this.state.p1_name}</h4>
                <Score score={this.state.player1} />
              </div>
              <div className="cool">
                <h4>{this.state.p2_name}</h4>
                <Score score={this.state.player2} />
              </div>
              <div className="cool">
                <h4>{this.state.p3_name}</h4>
                <Score score={this.state.player3} />
              </div>
              <div className="cool">
                <h4>{this.state.p4_name}</h4>
                <Score score={this.state.player4} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
