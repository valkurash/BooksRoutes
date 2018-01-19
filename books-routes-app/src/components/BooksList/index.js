import React, {Component} from 'react';
import PropTypes from 'prop-types'
import Book from '../Book'

export default class BookList extends Component{

    static propTypes = {
        books: PropTypes.array.isRequired,
    }

    render() {
        const {books} = this.props

        const bookElements = books.map(book => (
            <Book key={book.id} book={book}></Book>
        ))

        return (
            <div className="book-list">
                {bookElements}
            </div>
        )
    }
}