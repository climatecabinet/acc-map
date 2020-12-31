import React, { useEffect, useRef, useState} from 'react'
import mapboxgl from 'mapbox-gl'
import { fromJS } from 'immutable'
import { siteMetadata } from '../../../gatsby-config'
import { sources, layers,  config } from '../../../config/map'
import styled from '../../../util/style'
import Layout from '../Layout'
// import Sidebar from './Sidebar'

const Wrapper = styled.div`
    height: 100%;  
`

const MapContainer = styled.div`
    position: absolute;
    top: 59px;
    bottom: 0;
    left: 0;
    right: 0; 
`

const Sidebar = styled.div`
    position: absolute;
    top: 15px;
    left: 15px;
    bottom: 15px;
    width: 250px;
    overflow: auto;
    background: rgba(255, 255, 255, 0.8);
    font-family: "Arial";
    padding-left: 10px;
`

// const Sidebar = styled.div`
//     position: absolute;
//     top: 100px;
//     right: 50px;
//     width: 320px;
//     overflow: auto;
//     background: #FFF;
//     padding: 10px;
//     box-shadow: 0 0 0 1px rgba(16,22,26,.1), 0 1px 1px rgba(16,22,26,.2), 0 2px 6px rgba(16,22,26,.2);
// `

const mapboxToken = siteMetadata.mapboxToken

const Map = () => {

    if (!mapboxToken) {
        console.error(
            'ERROR: Mapbox token is required in gatsby-config.js siteMetadata'
        )
    }

    const mapContainer = useRef(null)
    const mapRef = useRef(null)
    const baseStyleRef = useRef(null)

    // initialize map when component mounts
    useEffect(() => {
        mapboxgl.accessToken = siteMetadata.mapboxToken
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: `mapbox://styles/mapbox/light-v10`,
            center: [-98.419172, 31.691066],
            zoom: 3.5, 
            minZoom: 2
        })

        mapRef.current = map
        window.map = map

        map.on('load', () => {
            // snapshot existing map config
            baseStyleRef.current = fromJS(map.getStyle())
            window.baseStyle = baseStyleRef.current
    
            // // add sources
            // Object.entries(sources).forEach(([id, source]) => {
            //     map.addSource(id, source)
            // })
    
            // // add layers
            // layers.forEach(layer => {
            //     map.addLayer(layer, 'waterway-label')
            // })
        })

        // clean up on unmount
        return () => map.remove();
    }, [])

    return (
    <Wrapper>
        <Layout />
        <Sidebar>This map displays the latest population estimates for Congressional districts in the U.S. and compares it to the state's target population for districts. The target population is what the districts would be, ideally, if they were redrawn based on the latest estimates.</Sidebar>
        <MapContainer ref={mapContainer} style={{ width: '100%', height: '100%' }}/>
    </Wrapper>
    )

}

export default Map