import React from "react";
import { render } from "react-dom";
import "./style/App.css";
import Tickers from "./components/Tickers.js";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Cryptocurrency Ticker</h2>
        </div>
        <Tickers />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
