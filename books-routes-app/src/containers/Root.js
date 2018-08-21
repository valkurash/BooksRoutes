import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import IconButton from "@material-ui/core/IconButton";
import MailIcon from "@material-ui/icons/Mail";
import logo from "../images/ib-logo.png";
import Politica from "../components/pages/Politica";
import BooksPage from "../components/pages/BooksPage";
import BookRoutesPage from "../components/pages/BookRoutesPage";
import AddBookPage from "../components/pages/AddBookPage";
import NotFoundPage from "../components/pages/NotFoundPage";

class Root extends Component {
  state = {
    anchorEl: null,
    open: false
  };
  handleClick = event => {
    const { currentTarget } = event;
    this.setState(state => ({
      anchorEl: currentTarget,
      open: !state.open
    }));
  };
  render() {
    const { anchorEl, open } = this.state;
    const id = open ? "mail-popper" : null;

    return (
      <div className="app">
        <AppBar position="static" color="default" className="app-header">
          <Toolbar
            style={{
              display: "flex",
              justifyContent: "space-between"
            }}
          >
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
            <IconButton
              aria-describedby={id}
              key="close"
              aria-label="mail"
              color="primary"
              className="mailIconBtn"
              onClick={this.handleClick}
            >
              <MailIcon style={{ fontSize: 36 }} />
            </IconButton>
            <Popper id={id} open={open} anchorEl={anchorEl} transition>
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                  <Paper style={{ padding: "15px" }}>
                    <a href="mailto:booksroutes.info@gmail.com">
                      booksroutes.info@gmail.com
                    </a>
                  </Paper>
                </Fade>
              )}
            </Popper>
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
        <footer
          style={{
            boxSizing: "border-box",
            textAlign: "center",
            backgroundColor: "#eee",
            borderTop: "1px solid #e0e0e0",
            padding: "20px 0"
          }}
        >
          <div className="mui-container mui--text-center">
            Made with ♥ by{" "}
            <a
              href="http://ideas-band.space"
              rel="noopener noreferrer"
              target="_blank"
            >
              Ideas Band LLC
            </a>{" "}
            © 2018
          </div>
        </footer>
      </div>
    );
  }
}
export default Root;
