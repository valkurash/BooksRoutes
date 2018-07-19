import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import logo from "../images/ib-logo.png";
import BooksPage from "../components/pages/BooksPage";
import BookRoutesPage from "../components/pages/BookRoutesPage";
import AddBookPage from "../components/pages/AddBookPage";
import NotFoundPage from "../components/pages/NotFoundPage";

class Root extends Component {
  render() {
    return (
      <div className="app">
        <AppBar position="static" color="default" className="app-header">
          <Toolbar>
            <Typography variant="title" component="a" href="/">
              <img
                src={logo}
                style={{
                  height: "50px",
                  display: "inline-block"
                }}
                alt="logo"
              />
              <div
                style={{
                  fontSize: "1.2em",
                  display: "inline-block"
                }}
              >
                Books<br />Routes
              </div>
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={{ padding: "10px 20px" }}>
          <Switch>
            <Redirect from="/" exact to="/books" />
            <Route exact path="/books" component={BooksPage} />
            <Route path="/books/:id" component={BookRoutesPage} />
            <Route exact path="/add" component={AddBookPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </div>
    );
  }
}
export default Root;
