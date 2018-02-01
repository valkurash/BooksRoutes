import React, { Component } from 'react';
import PropTypes from 'prop-types'

export default class FilterBooks extends Component {
  static propTypes = {
    //searchTerm: PropTypes.string.isRequired,
    //actions: PropTypes.object.isRequired
  };

  render() {
    //const {searchTerm, actions} = this.props;

    return (
      <form>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            name="search"
            placeholder="Search Book"
    /*value={searchTerm}*/
    /*onChange={e => actions.searchTermChanged(e.target.value)}*/ />
        </div>
      </form>
    );
  }
}