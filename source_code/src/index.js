import React from "react";
import { render } from "react-dom";
import "./style/App.css";
import Tickers from "./components/Tickers.js";
import Header from "./components/Header.js";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          {/* <div className="App-header">
            <h2>Cryptocurrency Ticker</h2>
          </div> */}
          <Header />
          <Tickers />
        </div>
      </MuiThemeProvider>
    );
  }
}

render(<App />, document.getElementById("root"));
