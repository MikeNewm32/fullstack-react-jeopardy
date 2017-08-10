import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      id: "",
      redirect: false,
      games: []
    };
  }

  componentWillMount() {
    axios.get("/api/game").then(res => {
      this.setState({ games: res.data });
    });
  }
  _handleChange = e => {
    this.setState({ username: e.target.value });
  };
  _handleSubmit = e => {
    e.preventDefault();
    console.log("CLICKING BUTTON");
    axios
      .post("/api/game", { banana: "banana", user: this.state.username })
      .then(res => {
        console.log("Successfully Created Game");
        console.log(res.data);
        this.setState({ redirect: true, id: res.data._id });
      });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={`/game/${this.state.id}`} />;
    } else {
      return (
        <div>
          <h1>JEOPARDY</h1>
          <form onSubmit={this._handleSubmit}>
            <input
              onChange={this._handleChange}
              value={this.state.username}
              type="text"
            />
            <button>New Game</button>
          </form>

          <ul>
            {this.state.games.map((game, i) => {
              return (
                <li key={i}>
                  <Link to={`/game/${game._id}`}>
                    {" "}{game.user}'s Game{" "}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      );
    }
  }
}
export default Home;
