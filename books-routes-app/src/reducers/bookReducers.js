import * as actionTypes from "../constants/ActionTypes";
import { arrToMap } from "./utils";
import { Record } from "immutable";

const BookDataRecord = Record({
  id: null,
  title: null,
  cover: null,
  description: null,
  authors: null,
  routes: null
});

const BookRecord = Record({
  entities: BookDataRecord,
  loading: false,
  loaded: false,
  error: false
});
const ReducerRecord = Record({
  entities: arrToMap([], BookRecord)
});

const defaultBookState = new ReducerRecord();

export const bookReducer = (state = defaultBookState, action) => {
  const { type, payload, response, error } = action;
  switch (type) {
    case actionTypes.FETCH_BOOK + actionTypes.SUCCESS:
      response.routes.map(r => {
        r.points.map(p => {
          if (p.polyline) {
            p.polyline = p.polyline
              .replace(/\s*/g, "")
              .replace("((", "(")
              .replace("))", ")")
              .match(/\((.*?)\)/g)
              .map(p => {
                let coords = p.replace(/[\(\)]/g, "").split(",");
                return {
                  lat: parseFloat(coords[0]),
                  lng: parseFloat(coords[1])
                };
              });
          }
        });
      });
      return state
        .setIn(
          ["entities", payload.id, "entities"],
          new BookDataRecord(response)
        )
        .setIn(["entities", payload.id, "loading"], false)
        .setIn(["entities", payload.id, "loaded"], true)
        .setIn(["entities", payload.id, "error"], false);
    case actionTypes.FETCH_BOOK + actionTypes.START:
      return state.setIn(["entities", payload.id, "loading"], true);
    case actionTypes.FETCH_BOOK + actionTypes.FAIL:
      return state
        .setIn(["entities", payload.id, "loading"], false)
        .setIn(["entities", payload.id, "loaded"], false)
        .setIn(["entities", payload.id, "error"], error);
    default:
      return state;
  }
};
