import { Map } from "immutable";

export function arrToMap(arr, RecordModel = Map, key = "id") {
  return arr.reduce(
    (acc, item) => acc.set(item[key], new RecordModel(item)),
    new Map({})
  );
}

export function mapToArr(obj) {
  return Object.values(obj);
}
