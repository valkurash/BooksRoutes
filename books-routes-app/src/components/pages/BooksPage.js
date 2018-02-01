import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BookList from '../BooksList';
import FilterBooks from '../FilterBooks';

export default class BooksPage extends Component {
  render() {
    return (
      <div>
        <FilterBooks />
        <BookList />
      </div>
    );
  }
}
