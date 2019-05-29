import React, { Component } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import NavBar from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
//importing the router for the DOM
import Router from "./Router";

class App extends Component {
  render() {
    return (
      //provider provide a way to share states between components
      <div className="App">
        <NavBar />
        <Router />
      </div>
    );
  }
}

export default App;

