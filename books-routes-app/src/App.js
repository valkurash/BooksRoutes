import React, {Component} from 'react'
import BooksRoutesApp from './components/BooksRoutesApp';
import {Provider} from 'react-redux'
import {ConnectedRouter} from 'react-router-redux'
import store from './store'
import history from './history'

class App extends Component {
    render() {
        return (
            <Provider store = {store}>
                <ConnectedRouter history = {history}>
                  <BooksRoutesApp />
                </ConnectedRouter>
            </Provider>
        )

    }
}

export default App