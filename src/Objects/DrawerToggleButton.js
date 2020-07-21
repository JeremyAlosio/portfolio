import React, { Component } from 'react';
import './DrawerToggleButton.css';

class DrawerToggleButton extends Component {

  state = {
    hovered: false
  }

  hoverActive = () => this.setState({ hovered: true })
  hoverDeactive = () => this.setState({ hovered: false })


  render() {
    return (
      <button
        onMouseEnter={this.hoverActive}
        onMouseLeave={this.hoverDeactive}
        className={`toggle-button ${this.state.hovered ? "hovered" : "unhovered"}`}
        onClick={this.props.click}>
        <div className="toggle-button_line" />
        <div className="toggle-button_line" />
        <div className="toggle-button_line" />
      </button>
    );
  }
}

export default DrawerToggleButton;
