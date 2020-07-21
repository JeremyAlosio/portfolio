import React, { Component } from 'react';
import './App.css';
import Sidebar from "./Sidebar"
import GrayoutCurtain from './Objects/GrayoutCurtain';
import DrawerToggleButton from './Objects/DrawerToggleButton';

class App extends Component {

  state = {
    sideDrawerOpen: false
  };

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen }
    });
  };

  backdropClickHandler = () => {
    this.setState({sideDrawerOpen: false});
  }

  render() {
    let backdrop;

    if (this.state.sideDrawerOpen) {
      backdrop = <GrayoutCurtain click={this.backdropClickHandler}/>
    }

    return (
      <div className="App">
        <div className="hamburger">
          <DrawerToggleButton click={this.drawerToggleClickHandler}/>
        </div>
        {backdrop}
        <Sidebar show={this.state.sideDrawerOpen}/>
        

        
        <h1>HELLO REACT!</h1>
      </div>
    );
  }
}

export default App;
