export function createGeoJson(data) {
  const geojson = {
    type: "FeatureCollection",
    features: data.map((item) => {
      return {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [+item.Long, +item.Lat],
        },
        properties: {
          ID: +item.ID,
          Difficulty: item.Difficulty,
          Distance_mi: +item.Distance_mi,
          Elevation_Gain_ft: +item.Elevation_Gain_ft,
          Elevation_ft: +item.Elevation_ft,
          Lat: +item.Lat,
          Long: +item.Long,
          Mountain_Peak: item.Mountain_Peak,
          Mountain_Range: item.Mountain_Range,
          Prominence_ft: +item.Prominence_ft,
          Standard_Route: item.Standard_Route,
          Traffic_High: +item.Traffic_High,
          Traffic_Low: +item.Traffic_Low,
          fourteener: item.fourteener,
          photo: item.photo,
          haha: item.test_data,
        },
      };
    }),
  };
  return geojson;
}
