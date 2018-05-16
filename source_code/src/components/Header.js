import React from "react";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import "../style/Header.css";

export default class Header extends React.Component {
    render(){
        return (
            <AppBar 
            title={"CryptoTicker"}
            iconElementRight={<HeaderButton />}
            showMenuIconButton={false}
            className="appbar-header"
            />
        )
    }
}

class HeaderButton extends React.Component {
    render(){
        return(
            <span>
                <RaisedButton primary={true} label="Refresh" className="header-btn"/>
                <RaisedButton secondary={true} label="Filter" className="header-btn"/>
            </span>
        )
    }
}