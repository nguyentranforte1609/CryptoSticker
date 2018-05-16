import React, { Component } from "react";
import "../style/Tickers.css";
import Cryptocurrency from "./Cryptocurrency";
import { fetchCryptocurrencyData } from "../actions/fetchData";

class Tickers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: "bitcoin",
          name: "Bitcoin",
          symbol: "BTC",
          price_usd: "1",
          percent_change_1h: "0",
          percent_change_24h: "0",
          percent_change_7d: "0"
        },
        {
          id: "ethereum",
          name: "Ethereum",
          symbol: "ETH",
          price_usd: "1",
          percent_change_1h: "0",
          percent_change_24h: "0",
          percent_change_7d: "0"
        },
        {
          id: "litecoin",
          name: "Litecoin",
          symbol: "LTC",
          price_usd: "1",
          percent_change_1h: "0",
          percent_change_24h: "0",
          percent_change_7d: "0"
        }
      ]
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
    let result = dispatchEvent()
    debugger
    this.setState({ data: result });
  }

  render() {
    return (
      <div className="tickers-container">
        <ul className="tickers">{this.state.data.map(currency => (
          <Cryptocurrency data={currency} key={currency.id} />
        ))}</ul>
        <p>Information updated every minute courtesy of coinmarketcap.com</p>
      </div>
    );
  }
}

export default Tickers;
