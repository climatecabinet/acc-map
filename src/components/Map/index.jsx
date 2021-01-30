// Not currently in use -- use Map.jsx instead

import React, { useEffect, useRef, useState} from 'react'
import PropTypes from 'prop-types'
import { List, fromJS } from 'immutable'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import 'mapbox-gl/dist/mapbox-gl.js'
import styled from '../../../util/style'
import { sources, layers,  config } from '../../../config/map'
import { siteMetadata } from '../../../gatsby-config'
import { hasWindow } from '../../../util/dom'
// import {useData} from '../components/Data'

import LayerToggle from './LayerToggle'

// container for the map component
const Wrapper = styled.div`
  position: relative;
  flex: 1 0 auto;
  z-index: 1;
`

const Map = () => {
    // const [data, index] = useData()

    const { mapboxToken } = siteMetadata

    if (!mapboxToken) {
        console.error(
            'ERROR: Mapbox token is required in gatsby-config.js siteMetadata'
        )
    }

    // if there is no window, we cannot render this component
    // if (!hasWindow) {
    //     return null
    // }

    const mapNode = useRef(null)
    const mapRef = useRef(null)
    const baseStyleRef = useRef(null)
    const [activeLayer, setActiveLayer] = useState('upper') // options are upper and lower


    useEffect(() => {
        // mapboxgl access token
        mapboxgl.accessToken = 'pk.eyJ1IjoicGFzaWgiLCJhIjoiY2pybzJqdTVjMHJzeDQ0bW80aGdzaXV3ayJ9.yxD8Nqu7FLnf8-lBo7F1zQ'

        const map = new mapboxgl.Map({
            container: mapNode.current,
            style: `mapbox://styles/mapbox/light-v10`,
            center: [-98.419172, 31.691066],
            zoom: 3,
            minZoom: 2
        })

        mapRef.current = map
        window.map = map

        // navigation control
        map.addControl(new mapboxgl.NavigationControl(), 'top-right')

        // add sources and layers once the map loads
        map.on('load', () => {
            // snapshot existing map config
            baseStyleRef.current = fromJS(map.getStyle())
            window.baseStyle = baseStyleRef.current

            // add sources
            Object.entries(sources).forEach(([id, source]) => {
              map.addSource(id, source)
            })

            // add layers
            layers.forEach(layer => {
              map.addLayer(layer, 'waterway-label')
            })

            // match expression that defines the color for every vector tile feature
            // lookup key for each district (CCID)
            // const matchExpression = ['match', ['get', 'ccid']]

            // calculate color values for each country based on ashtma value

        })

        // Build a GL match expression that defines the color for every vector tile feature
        // Use the ccid as the lookup key for the country shape (mongo data <> ccid <> vector data)
        const matchExpression = ['match', ['get', 'ccid']];

        // // Calculate color values for each country based on 'hdi' value
        // // data.forEach(function (row) {

        // // Convert the range of data values to a suitable color
        // var green = row['hdi'] * 255;
        // var color = 'rgb(0, '+ green + ', 0)';

        // matchExpression.push(row['code'], color);

        // });

        // // Last value is the default, used where there is no data
        // matchExpression.push('rgba(0, 0, 0, 0)');

        // // Add layer from the vector tile source to create the choropleth
        // // Insert it below the 'admin-1-boundary-bg' layer in the style
        // map.addLayer({
        // 'id': 'countries-join',
        // 'type': 'fill',
        // 'source': 'countries',
        // 'source-layer': 'country_boundaries',
        // 'paint': {
        // 'fill-color': matchExpression
        // }
        // }, 'admin-1-boundary-bg');


        // pop-up features
        map.on('click', 'upper-layer', function (e) {
            new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(e.features[0].properties.name)
            .addTo(map);
        })

        // show popup on click
        map.on('mouseenter', 'upper-layer', function () {
            map.getCanvas().style.cursor = 'pointer';
            })

        // change it back to a pointer when it leaves
        map.on('mouseleave', 'upper-layer', function () {
            map.getCanvas().style.cursor = '';
        })

    }, [])

    // toggle visibility of Senate and House layers
    const handleLayerToggle = newLayer => {
        const { current: map } = mapRef

        if (!(map && map.isStyleLoaded)) return

        setActiveLayer(newLayer)

        const isUpper = newLayer === 'upper'
        map.setLayoutProperty(
            'upper-layer',
            'visibility',
            isUpper ? 'visible' : 'none'
        )
        map.setLayoutProperty(
            'lower-layer',
            'visibility',
            isUpper ? 'none' : 'visible'
        )
    }

    return (
        <Wrapper>
            <div ref={mapNode} style={{ width: '100%', height: '100%' }} />

            {/* {mapRef.current && mapRef.current.isStyleLoaded && ( */}
                {/* <> */}
                    <LayerToggle
                        value={activeLayer}
                        options={[
                            { value: 'upper', label: 'Senate' },
                            { value: 'lower', label: 'House' },
                        ]}
                        onChange={handleLayerToggle}
                    />
                {/* </> */}
            {/* )} */}
        </Wrapper>
    )
}

export default Map
