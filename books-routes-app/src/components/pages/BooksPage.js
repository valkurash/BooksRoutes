import React, { Component } from 'react'
//import PropTypes from 'prop-types'
import BookList from '../BooksList'

import FixturesBooks from '../../fixtures'

export default class BooksPage extends Component {
    /*static propTypes = {

    };*/

    render() {
        return (
            <div>
                <BookList books={FixturesBooks}></BookList>
            </div>
        )
    }
}