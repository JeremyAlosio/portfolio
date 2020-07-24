import React, { Component } from 'react';
import './App.css';
import HighlightingTextButton from './Objects/HighlightingTextButton';
import AnimatedBackground from './Objects/AnimatedBackground';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="background">
        <AnimatedBackground />
          <div className="title_text">
            <h1>Hey, I'm Jeremy Alosio. <br /> I like to code.</h1>
            <HighlightingTextButton />
          </div>
        </div>

      </div>
    );
  }
}

export default App;
