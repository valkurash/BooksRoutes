import * as actionTypes from "../constants/ActionTypes";
import {arrToMap} from './utils'
import {Record} from 'immutable'

const BookRecord = Record({
  id: null,
  title: null,
  cover: null,
  description: null,
  authors: null,
  genres: null,
  loading: false
})

const ReducerRecord = Record({entities: arrToMap([], BookRecord), loading: false, loaded: false, error: false})

const defaultBooksState = new ReducerRecord()

export const booksReducer = (state = defaultBooksState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_BOOKS + actionTypes.SUCCESS:
      return state.set('entities', arrToMap(action.response, BookRecord).map(record => state.get('entities').has(record.id)
        ? state.get('entities').get(record.id)
        : record))
        .set('loading', false)
        .set('loaded', true)
        .set('error', false)
      case actionTypes
        .FETCH_BOOKS + actionTypes.START:
      return state.set('loading', true)
    case actionTypes.FETCH_BOOKS + actionTypes.FAIL:
      return state
        .set('loading', false)
        .set('loaded', false)
        .set('error', action.error)
      default:
      return state;
  }
};
