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

import LayerToggle from './LayerToggle'

// container for the map component
const Wrapper = styled.div`
  position: relative;
  flex: 1 0 auto;
  z-index: 1;
`

const Map = () => {
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
              map.addLayer(layer)
            })

        })
      
    }, [])

    // toggle visibility of Senate and House layers
    const handleLayerToggle = newLayer => {
        const { current: map } = mapRef

        if (!(map && map.isStyleLoaded)) return

        setActiveLayer(newLayer)

        const isUpper = newLayer === 'upper'
        map.setLayoutProperty(
            'upper-fill',
            'visibility',
            isUpper ? 'visible' : 'none'
        )
        map.setLayoutProperty(
            'lower-fill',
            'visibility',
            isUpper ? 'none' : 'visible'
        )
    }

    return (
        <Wrapper>
            <div ref={mapNode} style={{ width: '100%', height: '100%' }} />

            {mapRef.current && mapRef.current.isStyleLoaded && (
                <>
                    <LayerToggle
                        value={activeLayer}
                        options={[
                            { value: 'upper', label: 'Senate' },
                            { value: 'lower', label: 'House' },
                        ]}
                        onChange={handleLayerToggle}
                    />
                </>
            )}
        </Wrapper>
    )
}

export default Map 