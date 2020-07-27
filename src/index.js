import React from "react";
import ReactDOM from "react-dom";
import './index.css';
import App from './App';
import Pong from './Game/pong';

ReactDOM.render(<App />, document.getElementById("mainBody"));
ReactDOM.render(<Pong />, document.getElementById("pong"));