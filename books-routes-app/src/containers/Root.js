import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import logo from "../images/ib-logo.png";
import BooksPage from "../components/pages/BooksPage";
import BookRoutesPage from "../components/pages/BookRoutesPage";
import NotFoundPage from "../components/pages/NotFoundPage";
import "./Root.css";
import DocumentMeta from "react-document-meta";

const meta = {
  title: "Books Routes",
  description: "Books Routes Description",
  canonical: "http://booksroutes.azurewebsites.net",
  meta: {
    charset: "utf-8",
    name: {
      keywords: "books,routes,maps,travel"
    }
  }
};
class Root extends Component {
  render() {
    return (
      <DocumentMeta {...meta}>
        <div className="app">
          <header className="app-header">
            <img src={logo} className="app-logo" alt="logo" />
            <h1 className="app-title">
              Books<br />Routes
            </h1>
          </header>
          <div className="app-content">
            <Switch>
              <Redirect from="/" exact to="/books" />
              <Route exact path="/books" component={BooksPage} />
              <Route path="/books/:id" component={BookRoutesPage} />
              <Route path="*" component={NotFoundPage} />
            </Switch>
          </div>
        </div>
      </DocumentMeta>
    );
  }
}
export default Root;
