import React, { Component } from "react";
import { Link, Route, Redirect, Switch, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { fetchBook } from "../../actions/booksActions";
import drawerToggle from "../decorators/handleDrawerToggle";
import PropTypes from "prop-types";
import RouteMap from "../RouteMap";
import Book from "../Book";
import NotFoundPage from "./NotFoundPage";
import CircularProgress from "@material-ui/core/CircularProgress";
import ContentLoader from "react-content-loader";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import Divider from "@material-ui/core/Divider";
import MenuIcon from "@material-ui/icons/Menu";
import ArrowIcon from "@material-ui/icons/ArrowLeft";
import CloseIcon from "@material-ui/icons/Close";
import { Helmet } from "react-helmet";

const drawerWidth = 280;

const styles = theme => ({
  singleBook: {
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
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    ...theme.mixins.toolbar
  },
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up("md")]: {
      position: "relative",
      height: "calc(100vh - 84px)"
    }
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: 0,
    height: "calc(100vh - 84px)"
  },
  routesNavLink: {
    textDecoration: "none",
    "&.active": {
      backgroundColor: "rgba(0, 0, 0, 0.08)"
    }
  }
});

class BookRoutesPage extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        bookId: PropTypes.node,
        routeId: PropTypes.node
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
    const { book, drawerToggle, mobileOpen, classes, match } = this.props;

    if (!book) return null;

    const bookData = book.get("entities");
    const loading = book.get("loading");

    if (book.get("error"))
      return book.get("error").status === 404 ? (
        <NotFoundPage />
      ) : (
        <div className="error-msg">{book.get("error").statusText}</div>
      );

    const routesList = bookData
      ? bookData.routes
          .sort((a, b) => {
            if (a.name > b.name) return 1;
            if (a.name < b.name) return -1;
            return 0;
          })
          .map(route => (
            <ListItem
              component={NavLink}
              className={classes.routesNavLink}
              key={route.id}
              to={`/books/${bookData.id}/${route.id}`}
              onClick={drawerToggle}
              button
            >
              {route.name}
            </ListItem>
          ))
      : [];

    const drawer = (
      <div>
        <div className={classes.drawerHeader}>
          <Link
            to="/books"
            style={{
              display: "flex",
              alignItems: "center"
            }}
          >
            <ArrowIcon />
            <Typography variant="subheading" component="span">
              Вернуться к списку книг
            </Typography>
          </Link>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={drawerToggle}
            className={classes.navIconHide}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <Divider />
        {loading ? (
          <div
            style={{
              padding: "10px",
              clear: "both",
              overflow: "hidden"
            }}
          >
            <ContentLoader height={520} width={260}>
              <rect x="0" y="0" rx="0" ry="0" width="200" height="320" />
              <rect x="0" y="340" rx="4" ry="4" width="180" height="20" />
              <rect x="0" y="370" rx="3" ry="3" width="150" height="15" />
              <rect x="0" y="415" rx="2" ry="2" width="250" height="13" />
              <rect x="0" y="438" rx="2" ry="2" width="230" height="13" />
              <rect x="0" y="461" rx="2" ry="2" width="220" height="13" />
              <rect x="0" y="484" rx="2" ry="2" width="240" height="13" />
              <rect x="0" y="507" rx="2" ry="2" width="250" height="13" />
            </ContentLoader>
          </div>
        ) : (
          <div>
            <div
              style={{
                display: bookData.routes.length > 1 ? "block" : "none"
              }}
            >
              <List component="nav">{routesList}</List>
              <Divider />
            </div>
            <Book key={bookData.id} book={bookData} />
          </div>
        )}
      </div>
    );
    return (
      <div className={classes.singleBook}>
        {bookData && (
          <Helmet>
            <title>{`Туристические маршруты по мотивам книги «${
              bookData.title
            }»`}</title>
            <meta
              name="description"
              content={`Литературные маршруты. Туристический путеводитель по местам из книги «${
                bookData.title
              }». Карта для путешествий и обзорных экскурсий.`}
            />
            <meta
              name="keywords"
              content={`литературные маршруты, путешествия, туризм, экскурсии, книга «${
                bookData.title
              }», ${bookData.authors.map(author => author.name).join(", ")}`}
            />
            <meta
              property="og:url"
              content={`https://booksroutes.info/books/${bookData.id}/${
                match.params.routeId ? match.params.routeId + "/" : ""
              }`}
            />
            <meta
              property="og:title"
              content={`Туристические маршруты по мотивам книги «${
                bookData.title
              }»`}
            />
            <meta
              property="og:description"
              content={`Литературные маршруты. Туристический путеводитель по местам из книги «${
                bookData.title
              }». Карта для путешествий и обзорных экскурсий.`}
            />
            <meta property="og:type" content="book" />
            <meta property="og:image" content={bookData.cover} />
          </Helmet>
        )}
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
            {loading ? (
              <div
                style={{
                  height: "20px",
                  width: "250px"
                }}
              >
                <ContentLoader height={20} width={250} primaryColor={"#ffffff"}>
                  <rect x="0" y="0" rx="4" ry="4" width="250" height="20" />
                </ContentLoader>
              </div>
            ) : (
              <Typography color="inherit" variant="title" noWrap component="h2">
                {bookData.title}
              </Typography>
            )}
          </Toolbar>
        </AppBar>
        <Hidden
          mdUp
          implementation={navigator.userAgent === "ReactSnap" ? "css" : "js"}
        >
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
        <Hidden
          smDown
          implementation={navigator.userAgent === "ReactSnap" ? "css" : "js"}
        >
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
          {loading ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%"
              }}
            >
              <CircularProgress
                className="loader"
                style={{ display: "block", margin: "auto" }}
                size={50}
              />
            </div>
          ) : (
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
          )}
        </main>
      </div>
    );
  }
}
export default connect(
  (state, props) => ({
    book: state.get("singleBooks").entities.get(props.match.params.bookId)
  }),
  (dispatch, ownProps) => ({
    fetchBook: () => dispatch(fetchBook(ownProps.match.params.bookId))
  })
)(
  withStyles(styles, {
    withTheme: true,
    name: "BooksRoutesPage",
    classNamePrefix: "books-routes-"
  })(drawerToggle(BookRoutesPage))
);
