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
        type: 'vector',
        url: 'mapbox://shelby-green.7cjqgdty',
        // generateId: true
    },
    lower: {
        type: 'vector',
        url: 'mapbox://shelby-green.0z3cgh6c',
    }
}

export const layers = [
    {
      id: "upper-fill",
      source: "upper",
      'source-layer': 'sld',
      type: 'line',
      paint: {
        'line-color': '#FF1212',
        'line-width': 1
      },
    },

    {
        id: "lower-fill",
        source: "lower",
        'source-layer': 'sld',
        type: 'line',
        layout: {
            visibility: 'none',
        },
        paint: {
          'line-color': '#12E9FF',
          'line-width': 1
        },
    }
]
