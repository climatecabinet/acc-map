/**
 * Map configuration information used to construct map and populate layers
 */

// initial conditions
export const config = {
    accessToken: "pk.eyJ1IjoicGFzaWgiLCJhIjoiY2pybzJqdTVjMHJzeDQ0bW80aGdzaXV3ayJ9.yxD8Nqu7FLnf8-lBo7F1zQ",
    minZoom: 2,
    padding: 0.1
}

// ~single source of spatial truth~
// export const spatialbank = {
//     upper: {

//     },

// }

// sources for the map layers
export const sources = {
    upperVA: {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/shelbygreen/acc-map/master/tools/va-sldu.geojson',
    },
    upperNJ: {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/shelbygreen/acc-map/master/tools/nj-sldu.geojson',
    },
    lowerNJ: {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/shelbygreen/acc-map/master/tools/nj-sldl.geojson',
    },
    lowerVA: {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/shelbygreen/acc-map/master/tools/va-sldl.geojson',
    }
}

// TODO: make layer groups so i can style NJ and VA at the same time. via 1 stateLayer -- single source of truth
export const layers = [
    {
      id: "upperVA-fill",
      source: 'upperVA',
      type: 'fill',
      paint: { // put choropleth options
        'fill-color': 'rgba(255, 87, 51, 0.4)',
        'fill-outline-color': 'rgba(255, 75, 37, 1)'
      },
      layout: {
        visibility: 'visible',
        },
    },
    {
        id: "upperNJ-fill",
        source: 'upperNJ',
        type: 'fill',
        paint: { // put choropleth options
          'fill-color': 'rgba(255, 87, 51, 0.4)',
          'fill-outline-color': 'rgba(255, 75, 37, 1)'
        },
        layout: {
            visibility: 'visible',
        },
    },
    // {
    //     id: "upper-line",
    //     source: "upper",
    //     type: 'line',
    //     paint: {
    //         'line-color': '#FFFFFF',
    //         'line-width': 6
    //   },
    // },
    {
        id: "lowerNJ-fill",
        source: "lowerNJ",
        // 'source-layer': 'sld',
        type: 'fill',
        layout: {
            visibility: 'none',
        },
        paint: {
            'fill-color': 'rgba(200, 75, 50, 0.4)',
            'fill-outline-color': 'rgba(200, 75, 37, 1)'
        },
    },
    {
        id: "lowerVA-fill",
        source: "lowerVA",
        // 'source-layer': 'sld',
        type: 'fill',
        layout: {
            visibility: 'none',
        },
        paint: {
            'fill-color': 'rgba(200, 75, 50, 0.4)',
            'fill-outline-color': 'rgba(200, 75, 37, 1)'
        },
    },
]
