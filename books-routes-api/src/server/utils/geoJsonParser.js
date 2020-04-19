const fetch = require("node-fetch");
const tj = require("togeojson");
const DOMParser = require("xmldom").DOMParser;

const parseGeoJson = geoJson => {
  let bookObj = geoJson.features.reduce((acc, feature) => {
    const {
      properties: { layerName, name, description },
      geometry: { type, coordinates }
    } = feature;
    const path = {
      name: name||null,
      description:description||null,
      polyline: type === "LineString" ? JSON.stringify(coordinates.map(arr=>[arr[1],arr[0]])) : null,
      point:
        type === "Point" ? { lat: coordinates[1], lon: coordinates[0] } : null,
      polygon: type === "Polygon" ? JSON.stringify(coordinates.map(polyline=>polyline.map(arr=>({lat: arr[1],lng: arr[0]})))) : null
    };
    acc[layerName] = [...(acc[layerName] || []), path];
    return acc;
  }, {});
  return Object.entries(bookObj).map(pair => ({
    name: pair[0],
    path: pair[1]
  }));
};
const getRoutesFromGmap = mid => {
  return fetch(`https://www.google.com/maps/d/u/0/kml?mid=${mid}&forcekml=1`)
    .then(res => res.text())
    .then(body => {
      const kml = new DOMParser().parseFromString(body);
        return parseGeoJson(tj.kml(kml));
    })
    .catch(err => {
      throw err;
    });
};
const getCustomRoutes = points => {
  return [
    {
      name: "Основной маршрут",
      path: points.map(point => {
        return {
          name: point.key,
          description: point.description || "unknown",
          polyline: null,
          point: { lat: point.lat, lon: point.lng },
          polygon: null
        };
      })
    }
  ];
};

module.exports = { parseGeoJson, getRoutesFromGmap, getCustomRoutes };
