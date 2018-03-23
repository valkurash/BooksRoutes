import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import logo from "../images/ib-logo.png";
import BooksPage from "../components/pages/BooksPage";
import BookRoutesPage from "../components/pages/BookRoutesPage";
import AddBookPage from "../components/pages/AddBookPage";
import NotFoundPage from "../components/pages/NotFoundPage";
import "./Root.css";

class Root extends Component {
  render() {
    return (
      <div className="app">
        <AppBar position="static" color="default" className="app-header">
          <Toolbar>
            <Typography variant="title">
              <img src={logo} className="app-logo" alt="logo" />
              <div className="app-title">
                Books<br />Routes
              </div>
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="app-content">
          <Switch>
            <Redirect from="/" exact to="/books" />
            <Route exact path="/books" component={BooksPage} />
            <Route path="/books/:id" component={BookRoutesPage} />
            <Route exact path="/add" component={AddBookPage} />
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </div>
      </div>
    );
  }
}
export default Root;
