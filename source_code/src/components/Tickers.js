// Packages
import React, { Component } from "react";
import axios from "axios";
// UI Components
import Drawer from 'material-ui/Drawer';
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import Toggle from "material-ui/Toggle";
import Divider from 'material-ui/Divider';
// Local
import Cryptocurrency from "./Cryptocurrency";
import {limit, defaultFilterData, toogleStyle, availableFilter} from "../utils/constants";
import "../style/Tickers.css";
import "../style/Header.css";


class Tickers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: [],
      openFilterPanel: false,
      filters: []
    };
  }

  componentDidMount() {
    this.interval = setInterval(
      () => this.refreshData(this.state.filters),
      60 * 1000
    );
    let initialData = this.fetchData(defaultFilterData);
    debugger
    this.setState({
      coins : initialData
    })
    debugger
  }

  handleToggle(){
    this.setState({
      openFilterPanel: !this.state.openFilterPanel
    });
  }

  async fetchData(filter) {
    var finalResult = []
    await axios
      .get("https://api.coinmarketcap.com/v1/ticker/?limit=" + limit)
      .then(res => {
        var result = res.data.filter(currency => filter.includes(currency.name));
        finalResult = result;
      })
      .catch(err => {
          console.log(err)
          finalResult = [];
      });
    return finalResult
  }

  refreshData() {
    let newData = this.fetchData(this.state.filters);
    this.setState({
      coins: newData
    })
  }

  applyFilter(newFilters){
    let newData = this.fetchData(newFilters);
    this.setState({
      openFilterPanel: !this.state.openFilterPanel,
      coins : newData,
      filters : newFilters
    })
  }

  addRemoveFilter(coinName){
    let newFilters = this.state.filters;
    if (newFilters.indexOf(coinName) >= 0)
    {
      newFilters= newFilters.splice(newFilters.indexOf(coinName), 1);
    }
    else
    {
      newFilters = [...newFilters, coinName]
    }
    debugger
    this.setState({
      filters : newFilters
    })
  }

  render() {
    var newFilters = defaultFilterData;
    return (
      <div>
        <AppBar 
          title={"CryptoTicker"}
          iconElementRight={
            <span>
              <RaisedButton primary={true} label="Refresh" className="header-btn" onClick={this.refreshData.bind(this)}/>
              <RaisedButton secondary={true} label="Filter" className="header-btn" onClick={this.handleToggle.bind(this)}/>
            </span>
          }
          showMenuIconButton={false}
          className="appbar-header"
        />
        <Drawer 
          open={this.state.openFilterPanel} 
          docked={false} 
          width={200} 
          openSecondary={true} 
          //onRequestChange={this.applyFilter.bind(this)(newFilters)}
          >
          {
            availableFilter.map( filter => {
              return (
                <div>
                  <Divider />
                  <Toggle 
                    label={filter} 
                    style={toogleStyle.toggle} 
                    defaultToggled={defaultFilterData.indexOf(filter) >= 0 ? true : false}
                    onToggle={
                      newFilters.indexOf(filter) >= 0 ?
                        newFilters= newFilters.splice(newFilters.indexOf(filter), 1) : 
                        newFilters = [...newFilters, filter]
                    }
                  />
                </div>
              );
            })
          }
        </Drawer>
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