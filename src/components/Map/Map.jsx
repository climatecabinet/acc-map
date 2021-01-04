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
    overflow: hidden;
    top: calc(47px + 10px);
    z-index: 4000;
    background-color: #fff;
    width: 320px;
    padding: 10px;
    border-radius: 0;
    color: #29323c;
    right: 10px;
    margin: auto;
    box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.1), 0 1px 1px rgba(16, 22, 26, 0.2), 0 2px 6px rgba(16, 22, 26, 0.2);
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
            Object.entries(sources).forEach(([id, source]) => {
                map.addSource(id, source)
            })
    
            // // add layers
            layers.forEach(layer => {
                map.addLayer(layer, 'waterway-label')
            })
        })

        // clean up on unmount
        return () => map.remove();
    }, [])

    return (
    <Wrapper>
        <Layout />
        <MapContainer ref={mapContainer} style={{ width: '100%', height: '100%' }}/>
        <Sidebar>
            <p>Texas State District 28</p>
            <p>Senator or Representative or Assembly(wo)man</p>
            <p>Dropdown for Asthma rates and Clean Energy jobs</p>
            <p>Clickable List of Relevant Legislation, 2015-2020</p>
        </Sidebar>
    </Wrapper>
    )

}

export default Map