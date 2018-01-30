import React, { Component } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'
import logo from '../images/ib-logo.png';
import './BooksRoutesApp.css';
import BooksPage from './pages/BooksPage'
import BookRoutesPage from './pages/BookRoutesPage'
import NotFoundPage from './pages/NotFoundPage'

class BooksRoutesApp extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Books<br/>Routes</h1>
        </header>
        <div className="App-content">
        <Switch>
                        <Redirect from="/" exact to="/books" />
                        <Route path="/books" component={BooksPage} />
                        <Route path='/bookroutes' component={BookRoutesPage}/>
                        <Route path="*" component={NotFoundPage} />
                    </Switch>
        </div>
      </div>
    );
  }
}
export default BooksRoutesApp