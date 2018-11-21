import { Map } from "immutable";

export function arrToMap(arr, RecordModel = Map, key = "id") {
  return arr.reduce(
    (acc, item) => acc.set(item[key], new RecordModel(item)),
    new Map({})
  );
}

export function fetchAPI(callAPI, payload, method = "GET") {
  let options = {};
  if (method === "POST")
    options = {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" }
    };

  return fetch(callAPI, options)
    .then(res => {
      if (!res.ok) {
        throw new (res => res)(res);
      }
      // Read the response as json.
      return res.json();
    })
    .then(response => {
      if (response.status === "success") {
        return Promise.resolve({ payload, response: response.data });
      } else {
        return Promise.reject({
          status: response.status,
          message: response.message
        });
      }
    })
    .catch(error => Promise.reject({ payload, error }));
}
