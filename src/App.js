import React, { Component } from "react";
const capitals = require("./data/capitals.json");

class App extends Component {
  constructor() {
    super();

    this.state = {
      country: "",
      fiveCities: [],
      showMsg: false,
      rightOrWrong: ""
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

  check = country => {
    this.setState({
      showMsg: true,
      rightOrWrong: country.name === this.state.country ? "right" : "wrong"
    });
  };

  next = () => {
    this.setState({
      showMsg: false
    });
    this.selectRandom();
  };

  render() {
    return (
      <div className="App">
        <p>
          What's the capital of <strong>{this.state.country}</strong>?
        </p>
        {this.state.fiveCities.map((country, i) => (
          <button key={i} onClick={() => this.check(country)}>
            {country.capital}
          </button>
        ))}
        {this.state.showMsg && <p>You are {this.state.rightOrWrong}!</p>}
        <hr />
        <button onClick={this.next}>Next</button>
      </div>
    );
  }
}

export default App;
