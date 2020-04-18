import logo from '../images/br-logo.png';
import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import IconButton from '@material-ui/core/IconButton';
import MailIcon from '@material-ui/icons/Mail';
import BlogIcon from '@material-ui/icons/MenuBook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import Politica from '../routes/Politica';
import BooksPage from '../routes/BooksPage';
import BookRoutesPage from '../routes/BookRoutesPage';
import AddBookPage from '../routes/AddBookPage';
import NotFoundPage from '../routes/NotFoundPage';

interface IState {
  anchorEl: any;
  open: boolean;
}

class Root extends Component<{}, IState> {
  state = {
    anchorEl: null,
    open: false,
  };
  handleClick = (event: any) => {
    const { currentTarget } = event;
    this.setState(state => ({
      anchorEl: currentTarget,
      open: !state.open,
    }));
  }
  render() {
    const { anchorEl, open } = this.state;
    const id = open ? 'mail-popper' : undefined;

    return (
      <div className="app">
        <AppBar position="static" color="default" className="app-header">
          <Toolbar
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <a href="/">
              <img
                src={logo}
                style={{
                  height: '50px',
                  display: 'inline-block',
                }}
                alt="logo"
              />
            </a>
            <div>
              <IconButton
                color="secondary"
                href="blog.booksroutes.info"
                target="_blank"
              >
                <BlogIcon />
              </IconButton>
              <IconButton
                href="instagram.com/books_routes"
                target="_blank"
                color="inherit"
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                href="twitter.com/booksroutes"
                target="_blank"
                color="inherit"
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                aria-describedby={id}
                key="close"
                aria-label="mail"
                color="inherit"
                className="mailIconBtn"
                onClick={this.handleClick}
              >
                <MailIcon />
              </IconButton>
              <Popper
                id={id}
                open={open}
                anchorEl={anchorEl}
                transition={true}
                style={{ zIndex: 1 }}
              >
                {({ TransitionProps }) => (
                  <Fade {...TransitionProps} timeout={350}>
                    <Paper style={{ padding: '15px' }}>
                      <a href="mailto:booksroutes.info@gmail.com">
                        booksroutes.info@gmail.com
                      </a>
                    </Paper>
                  </Fade>
                )}
              </Popper>
            </div>
          </Toolbar>
        </AppBar>
        <div style={{ padding: '10px 20px' }}>
          <Switch>
            <Redirect from="/" exact={true} to="/books" />
            <Redirect from="/books/page/1" exact={true} to="/books" />
            <Route exact={true} path="/books" component={BooksPage} />
            <Route path="/books/page/:pageId" component={BooksPage} />
            <Route path="/books/:bookId/:routeId?" component={BookRoutesPage} />
            <Route exact={true} path="/add" component={AddBookPage} />
            <Route exact={true} path="/politica" component={Politica} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </div>
    );
  }
}
export default Root;
