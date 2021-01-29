/**
 * Map configuration information used to construct map and populate layers
 */
export const config = {
    accessToken: "pk.eyJ1IjoicGFzaWgiLCJhIjoiY2pybzJqdTVjMHJzeDQ0bW80aGdzaXV3ayJ9.yxD8Nqu7FLnf8-lBo7F1zQ",
    minZoom: 2,
    padding: 0.1
}

export const sources = {
    upper: {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/shelbygreen/acc-map/master/tools/nj-sldu.geojson',
    },
    lower: {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/shelbygreen/acc-map/master/tools/nj-sldl.geojson',
    }
}

// hello !!~

export const layers = [
    {
      id: "upper-layer",
      source: "upper",
    //   'source-layer': 'sld',
      type: 'fill',
      paint: { // put choropleth options
        'fill-color': 'rgba(255, 87, 51, 0.4)',
        'fill-outline-color': 'rgba(255, 75, 37, 1)'
      },
    },

    {
        id: "upper-line",
        source: "upper",
        type: 'line',
        paint: {
            'line-color': '#FFFFFF',
            'line-width': 6
      },
    },

    {
        id: "lower-layer",
        source: "lower",
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
