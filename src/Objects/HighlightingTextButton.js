import React, { Component } from 'react';
import './HighlightingTextButton.css';

class HighlightingTextButton extends Component {

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
        className={`button ${this.state.hovered ? "hovered" : "unhovered"}`}
        onClick={this.props.click}>
        <div className="button_text">
          <h2>
            View my work &nbsp;<i id="arrow"></i>
          </h2>
        </div>
        
      </button>
    );
  }
}

export default HighlightingTextButton;
