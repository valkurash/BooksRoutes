import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './style.css'

export default class Book extends Component {

    static propTypes = {
        book: PropTypes.shape({
            id: PropTypes.number.isRequired,
            isbn: PropTypes.string,
            title: PropTypes.string.isRequired,
            cover_url: PropTypes.string,
            description: PropTypes.string,
            authors: PropTypes.arrayOf(PropTypes.shape({
                id: PropTypes.number.isRequired,
                avatar: PropTypes.string.isRequired,
                name: PropTypes.string
            })),
            genres: PropTypes.arrayOf(PropTypes.shape({
                id: PropTypes.number.isRequired,
                title: PropTypes.string.isRequired,
            }))
        })
    }

    render() {
        const { book } = this.props

        const authors = book.authors.map(author => author.name).join(', ')
        const genres = book.genres.map(genre => genre.title).join(', ')

        if (!book) return null

        return (
            <div className="book-item">
                <div className="cover"><img alt="book cover" src={book.cover} /></div>
                <div className="info">
                    <div className="title">{book.title}</div>
                    <div className="authors">{authors}</div>
                    <div className="genres">{genres}</div>
                </div>
                <div className="description">{book.description}</div>
            </div>
        )
    }
}