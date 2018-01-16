import React, { Component } from 'react';
import logo from './images/ib-logo.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Books<br/>Routes</h1>
        </header>
        <div className="App-content">
          Content
        </div>
      </div>
    );
  }
}

export default App;
