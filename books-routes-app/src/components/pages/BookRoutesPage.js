import React, { Component } from "react";
import { Link, Route, Redirect, Switch, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { fetchBook } from "../../actions/booksActions";
import PropTypes from "prop-types";
import RouteMap from "../RouteMap";
import Book from "../Book";

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
    fetchBook: PropTypes.func
  };

  componentDidMount() {
    const { book, fetchBook } = this.props;
    if (!book || (!book.get("loading") && !book.get("loaded"))) fetchBook();
  }
  render() {
    const { book } = this.props;

    if (!book) return null;
    const bookData = book.get("entities");
    if (book.get("loading")) return <div className="loader">Loading...</div>;
    if (book.get("error"))
      return <div className="errorMsg">{book.get("error").message}</div>;
    const routesList = bookData.routes.map(route => (
      <li key={route.id}>
        <NavLink to={`/books/${bookData.id}/${route.id}`}>{route.name}</NavLink>
      </li>
    ));
    return (
      <div>
        <div className="routeSidebar">
          <Link to="/">Back to all Books</Link>
          <h1>BookRoutesPage {bookData.title}</h1>
          <Book key={bookData.id} book={bookData} sidebar={true} />
          <ul className="routesNav">{routesList}</ul>
        </div>
        <div className="routeContent">
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
        </div>
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
)(BookRoutesPage);
