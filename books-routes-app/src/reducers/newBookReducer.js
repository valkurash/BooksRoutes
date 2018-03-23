//import * as actionTypes from "../constants/ActionTypes";
import { Record } from "immutable";

const newBookDataRecord = Record({
  title: null,
  authors: null,
  route: null,
  points: []
});

const defaultBookState = new newBookDataRecord();

export const newBookReducer = (state = defaultBookState, action) => {
  const { type } = action;
  switch (type) {
    default:
      return state;
  }
};
