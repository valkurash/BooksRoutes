import React, { Component } from "react";
import { Link, Route, Redirect, Switch, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { fetchBook } from "../../actions/booksActions";
import drawerToggle from "../decorators/handleDrawerToggle";
import PropTypes from "prop-types";
import RouteMap from "../RouteMap";
import Book from "../Book";
import { CircularProgress } from "material-ui/Progress";
import { withStyles } from "material-ui/styles";
import Drawer from "material-ui/Drawer";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import List, { ListItem } from "material-ui/List";
import Typography from "material-ui/Typography";
import IconButton from "material-ui/IconButton";
import Hidden from "material-ui/Hidden";
import Divider from "material-ui/Divider";
import MenuIcon from "material-ui-icons/Menu";
import ArrowIcon from "material-ui-icons/ArrowBack";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex",
    width: "100%"
  },
  appBar: {
    position: "absolute",
    marginLeft: drawerWidth,
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  navIconHide: {
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,

  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up("md")]: {
      position: "relative"
    }
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  }
});

class BookRoutesPage extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.node
      }).isRequired
    }).isRequired,
    book: PropTypes.shape({
      entities: PropTypes.shape({
        id: PropTypes.number.isRequired,
        isbn: PropTypes.string,
        title: PropTypes.string.isRequired,
        cover_url: PropTypes.string,
        description: PropTypes.string,
        authors: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.number.isRequired,
            avatar: PropTypes.string.isRequired,
            name: PropTypes.string
          })
        ),
        routes: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string
          })
        )
      }),
      loading: PropTypes.bool,
      loaded: PropTypes.bool,
      error: PropTypes.oneOfType([PropTypes.bool, PropTypes.object])
    }),
    fetchBook: PropTypes.func,
    classes: PropTypes.object.isRequired,
    drawerToggle: PropTypes.func,
    mobileOpen: PropTypes.bool
  };

  componentDidMount() {
    const { book, fetchBook } = this.props;
    if (!book || (!book.get("loading") && !book.get("loaded"))) fetchBook();
  }

  render() {
    const { book, drawerToggle, mobileOpen, classes } = this.props;

    if (!book) return null;
    const bookData = book.get("entities");
    if (book.get("loading"))
      return (
        <CircularProgress
          className="loader"
          style={{ display: "block", margin: "auto" }}
          size={50}
        />
      );
    if (book.get("error"))
      return <div className="error-msg">{book.get("error").message}</div>;

    const routesList = bookData.routes.map(route => (
      <ListItem key={route.id}>
        <NavLink to={`/books/${bookData.id}/${route.id}`}>{route.name}</NavLink>
      </ListItem>
    ));
    const drawer = (
      <div>
        <div
          className={classes.toolbar}
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column"
          }}
        >
          <Link to="/">
            <ArrowIcon />
            <span
              style={{
                display: "inline-block",
                lineHeight: "24px",
                verticalAlign: "top"
              }}
            >
              Back to all Books
            </span>
          </Link>
        </div>
        <Divider />
        <List className="routes-nav">{routesList}</List>
        <Divider />
        <Book key={bookData.id} book={bookData} />
      </div>
    );
    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={drawerToggle}
              className={classes.navIconHide}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              {bookData.title} Routes
            </Typography>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={drawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Redirect
              from="/books/:id"
              exact
              to={`/books/${bookData.id}/${bookData.routes[0].id}`}
            />
            {bookData.routes.map((route, index) => (
              <Route
                exact
                key={index}
                path="/books/:bookId/:routeId"
                component={RouteMap}
              />
            ))}
          </Switch>
        </main>
      </div>
    );
  }
}
export default connect(
  (state, props) => ({
    book: state.get("singleBooks").entities.get(props.match.params.id)
  }),
  (dispatch, ownProps) => ({
    fetchBook: () => dispatch(fetchBook(ownProps.match.params.id))
  })
)(withStyles(styles, { withTheme: true })(drawerToggle(BookRoutesPage)));
