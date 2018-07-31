import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import logo from "../images/ib-logo.png";
import Politica from "../components/pages/Politica";
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
            <a href="/">
              <img
                src={logo}
                style={{
                  height: "50px",
                  display: "inline-block"
                }}
                alt="logo"
              />
              <Typography
                variant="title"
                component="h1"
                style={{
                  verticalAlign: "text-bottom",
                  display: "inline-block"
                }}
              >
                Маршруты<br />из книг
              </Typography>
            </a>
          </Toolbar>
        </AppBar>
        <div style={{ padding: "10px 20px" }}>
          <Switch>
            <Redirect from="/" exact to="/books" />
            <Route exact path="/books" component={BooksPage} />
            <Route path="/books/:bookId/:routeId?" component={BookRoutesPage} />
            <Route exact path="/add" component={AddBookPage} />
            <Route exact path="/politica" component={Politica} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </div>
    );
  }
}
export default Root;
