import React, { Component } from "react";
const capitals = require("./data/capitals.json");

class App extends Component {
  constructor() {
    super();

    this.state = {
      country: "",
      fiveCities: [],
      rightOrWrong: "",
      scoreRight: 0,
      scoreWrong: 0,
      disabled: false,
      chosenBtn: null
    };
  }

  componentDidMount() {
    this.selectRandom();
  }

  selectRandom = () => {
    let capitalsClone = [...capitals];
    let randomFiveCapitals = [];

    for (let i = 0; i < 5; i++) {
      let selectedCapital = capitalsClone.splice(
        Math.floor(Math.random() * capitalsClone.length),
        1
      );
      randomFiveCapitals.push(selectedCapital[0]);
    }

    let selectedCountry =
      randomFiveCapitals[Math.floor(Math.random() * 5)].name;

    this.setState({ country: selectedCountry, fiveCities: randomFiveCapitals });
  };

  check = (country, i) => {
    country.name === this.state.country
      ? this.setState({
          rightOrWrong: "right",
          scoreRight: this.state.scoreRight + 1,
          disabled: true,
          chosenBtn: i
        })
      : this.setState({
          rightOrWrong: "wrong",
          scoreWrong: this.state.scoreWrong + 1,
          disabled: true,
          chosenBtn: i
        });
  };

  next = () => {
    this.setState({
      disabled: false,
      rightOrWrong: ""
    });
    this.selectRandom();
  };

  render() {
    return (
      <div className="App">
        <div className="rightOrWrong">
          <div>
            Right: <span className="rightScore">{this.state.scoreRight}</span>
          </div>
          <div>
            Wrong: <span className="wrongScore">{this.state.scoreWrong}</span>
          </div>
        </div>
        <div className="question">
          <div>What's the capital of:</div>
          <div className="capital">{this.state.country}</div>
        </div>
        {this.state.fiveCities.map((country, i) => (
          <button
            key={i}
            onClick={() => this.check(country, i)}
            disabled={this.state.disabled}
            className={
              this.state.chosenBtn === i ? this.state.rightOrWrong : null
            }
          >
            {country.capital}
          </button>
        ))}
        <button className={"nextBtn"} onClick={this.next}>
          Next
        </button>
      </div>
    );
  }
}

export default App;
