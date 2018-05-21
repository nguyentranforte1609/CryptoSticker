// Packages
import React, { Component } from "react";
import axios from "axios";
// UI Components
import Drawer from '@material-ui/core/Drawer';
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
// Local
import Cryptocurrency from "./Cryptocurrency";
import {limit, defaultFilterData, availableFilter} from "../utils/constants";
import "../style/Tickers.css";
import "../style/Header.css";


class Tickers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: [],
      openFilterPanel: false,
      filters: [],
      allFilters : [],
    };
  }

  async componentDidMount() {
    this.interval = setInterval(
      () => this.refreshData(this.state.filters),
      60 * 1000
    );
    let initialData = await this.fetchData(defaultFilterData);
    this.setState({
      coins : initialData,
      filters : defaultFilterData,
      allFilters : availableFilter,
    })
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

  async refreshData() {
    let newData = await this.fetchData(this.state.filters);
    this.setState({
      coins: newData,
    })
  }

  onCheck(event){
    let filterValue = event.target.defaultValue;
    let currentFilters = this.state.filters;
    if (event.target.checked === true)
    {
      this.setState({
        filters : currentFilters.indexOf(filterValue) === -1 ? currentFilters.concat(filterValue) : [currentFilters]
      })
    }
    else
    {
      let indexOfFilter = currentFilters.indexOf(filterValue);
      this.setState({
        filters : currentFilters.splice(indexOfFilter, 1)
      })
    }
  }

  render() {
    return (
      <div>
        <AppBar 
          title={"CryptoTicker"}
          iconElementRight={
            <span>
              <RaisedButton primary={true} label="Refresh" className="header-btn" onClick={() => {this.refreshData()}}/>
              <RaisedButton secondary={true} label="Filter" className="header-btn" onClick={this.handleToggle.bind(this)}/>
            </span>
          }
          showMenuIconButton={false}
          className="appbar-header"
        />
        <Drawer 
          open={this.state.openFilterPanel}
          anchor={'right'} 
          docked={"false"}
          onClose={() => {
            this.setState({openFilterPanel: false});
            this.refreshData();
           } 
          }
          >
          {
            this.state.allFilters.map( filter => {
              return (
                <div>
                  <Divider />
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        value={filter}
                        onChange={(value) => {this.onCheck(value)}}
                        defaultChecked={this.state.filters.indexOf(filter)!==-1 ? true : false}
                      />
                    }
                    label={filter}
                  />
                </div>
              );
            })
          }
        </Drawer>
        <GridList className="container-fluid" cols={4}>
          {this.state.coins.map(currency => (
              <GridListTile cols={1} rows={2}>
                  <Cryptocurrency data={currency} key={currency.id} />
              </GridListTile>
            ))}
        </GridList>
      </div>
    );
  }
}

export default Tickers;