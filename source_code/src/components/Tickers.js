import React, { Component } from "react";
import "../style/Tickers.css";
import Cryptocurrency from "./Cryptocurrency";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import "../style/Header.css";
import axios from "axios";

const limit = 10;
const filterData = ["bitcoin", "ethereum", "litecoin"];

class Tickers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: []
    };
  }

  componentDidMount() {
    this.fetchData();
    this.interval = setInterval(
      () => this.fetchData(),
      60 * 1000
    );
  }

  fetchData() {
    axios
      .get("https://api.coinmarketcap.com/v1/ticker/?limit=" + limit)
      .then(res => {
        var result = res.data.filter(currency => filterData.includes(currency.id));
        this.setState({
          coins: result
        })
      })
      .catch(err => {
          console.log(err)
          return [];
      });
  }

  render() {
    return (
      <div>
        <AppBar 
          title={"CryptoTicker"}
          iconElementRight={
            <span>
              <RaisedButton primary={true} label="Refresh" className="header-btn" onClick={this.fetchData}/>
              <RaisedButton secondary={true} label="Filter" className="header-btn"/>
            </span>
          }
          showMenuIconButton={false}
          className="appbar-header"
        />
        <div className="tickers-container">
          <ul className="tickers">{this.state.coins.map(currency => (
            <Cryptocurrency data={currency} key={currency.id} />
          ))}</ul>
          <p>Information updated every minute courtesy of coinmarketcap.com</p>
        </div>
      </div>
    );
  }
}

export default Tickers;

// data: [
//   {
//     id: "bitcoin",
//     name: "Bitcoin",
//     symbol: "BTC",
//     price_usd: "1",
//     percent_change_1h: "0",
//     percent_change_24h: "0",
//     percent_change_7d: "0"
//   },
//   {
//     id: "ethereum",
//     name: "Ethereum",
//     symbol: "ETH",
//     price_usd: "1",
//     percent_change_1h: "0",
//     percent_change_24h: "0",
//     percent_change_7d: "0"
//   },
//   {
//     id: "litecoin",
//     name: "Litecoin",
//     symbol: "LTC",
//     price_usd: "1",
//     percent_change_1h: "0",
//     percent_change_24h: "0",
//     percent_change_7d: "0"
//   }
// ]