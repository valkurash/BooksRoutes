import * as actionTypes from "../constants/ActionTypes";
import { Record } from "immutable";
import { arrToMap } from "./utils";
import { initialStoreState } from "../store/configureStore";

const singleBookRecord = Record({
  id: null,
  title: null,
  cover: null,
  description: null,
  authors: null,
  routes: null
});
const singleBookWrapper = Record({
  entities: singleBookRecord,
  loading: false,
  loaded: false,
  error: false
});
const defaultSingleBooksState = Record({
  entities: arrToMap([], singleBookWrapper)
});

export const bookReducer = (
  state = initialStoreState.get("singleBooks") || new defaultSingleBooksState(),
  action
) => {
  const { type, payload, response, error } = action;
  switch (type) {
    case actionTypes.FETCH_BOOK + actionTypes.SUCCESS:
      response.routes.forEach(r => {
        r.points.forEach(p => {
          if (p.polyline) {
            p.polyline = p.polyline
              .replace(/\s*/g, "")
              .replace("((", "(")
              .replace("))", ")")
              .match(/\((.*?)\)/g)
              .map(p => {
                let coords = p.replace(/[()]/g, "").split(",");
                return {
                  lat: parseFloat(coords[0]),
                  lng: parseFloat(coords[1])
                };
              });
            p.strokeColor = `hsl(${Math.floor(
              Math.random() * 360
            )}, 100%, 50%)`;
          }
        });
      });
      return state
        .setIn(
          ["entities", payload.id, "entities"],
          new singleBookRecord(response)
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
