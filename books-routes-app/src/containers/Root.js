import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import logo from "../images/ib-logo.png";
import BooksPage from "../components/pages/BooksPage";
import BookRoutesPage from "../components/pages/BookRoutesPage";
import NotFoundPage from "../components/pages/NotFoundPage";
import "./Root.css";

class Root extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">
            Books<br />Routes
          </h1>
        </header>
        <div className="App-content">
          <Switch>
            <Redirect from="/" exact to="/books" />
            <Route exact path="/books" component={BooksPage} />
            <Route path="/books/:id" component={BookRoutesPage} />
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </div>
      </div>
    );
  }
}
export default Root;
