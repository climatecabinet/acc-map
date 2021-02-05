import React, { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import { fromJS } from 'immutable'
import { siteMetadata } from '../../../gatsby-config'
// import { sources, layers,  config } from '../../../config/map'
import { useData } from '../Data/regions'
import { useRepData } from '../Data/representatives'
import styled from '../../../util/style'
import Layout from '../Layout'
// import LayerToggle from './LayerToggle'
// import Sidebar from '../Sidebar'

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
    overflow-y: auto;
    height: 200px;
    top: calc(47px + 30px);
    z-index: 4000;
    background-color: #fff;
    width: 340px;
    padding: 10px;
    border-radius: 0;
    color: #29323c;
    right: 30px;
    margin: auto;
    box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.1), 0 1px 1px rgba(16, 22, 26, 0.2), 0 2px 6px rgba(16, 22, 26, 0.2);
`

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
    // const [activeLayer, setActiveLayer] = useState('upper') // options are upper and lower

    // data from MongoDB/GraphQL query
    // regions Data
    const [regionsData, regionsIndex] = useData()
    // representatives Data
    const [repData, repIndex] = useRepData()

    // initialize map when component mounts
    useEffect(() => {
        mapboxgl.accessToken = siteMetadata.mapboxToken
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: `mapbox://styles/mapbox/light-v10`,
            center: [-74.53817868495557, 40.344524328768934],
            zoom: 8, 
            minZoom: 2
        })

        mapRef.current = map
        window.map = map

        map.on('load', () => { 

            // snapshot existing map config
            baseStyleRef.current = fromJS(map.getStyle())
            window.baseStyle = baseStyleRef.current
            
            // TODO: investigate how to use this code and reference the appropriate layers
            // add every source
            // Object.entries(sources).forEach(([id, source]) => {
            //     map.addSource(id, source)
            // })
            
            // // add every layer
            // layers.forEach(layer => {
            //     map.addLayer(layer)
            // })
            map.addLayer({ 
              'id': 'upper',
              'source': {
                'type': 'geojson',
                'data': 'https://raw.githubusercontent.com/shelbygreen/acc-map/master/tools/nj-sldu.geojson' // <--- Add the Map ID you copied here
              },
              'type': 'fill',
              'paint': {
                'fill-color': 'rgba(255, 87, 51, 0.4)',
                'fill-outline-color': 'rgba(240, 85, 55, 0.9)'
              }
            })

            map.resize();
        });

            //TODO: potentially a faster way than reloading geojson as source.
            //https://github.com/mapbox/mapbox-gl-js/issues/3018#issuecomment-277117802
    
        map.on('click', 'upper', mapElement => {

            // on click, retrive the ccid and regions.incumbent.rep id for the district
            const ccidCode = mapElement.features[0].properties.ccid 
            const incumbentId = regionsIndex.getIn([ccidCode, 'incumbents', 0, 'rep'])

            // using the ccid, lookup attributes and store into as html
            const html = `
                <center><strong>${regionsIndex.getIn([ccidCode, 'state_abbr'])} State District ${parseInt(regionsIndex.getIn([ccidCode, 'district_no']), 10)}</strong></center>
                <br />
                <strong>Adult Asthma Rate (%):</strong> ${((100 * regionsIndex.getIn([ccidCode, 'asthma', 'child'])) / regionsIndex.getIn([ccidCode, 'asthma', 'population'])).toFixed(2)}
                <br />
                <strong>Clean Jobs (%):</strong> ${regionsIndex.getIn([ccidCode, 'jobs', 'perc_of_state_jobs'])}
                <br />
                <strong>${repIndex.getIn([incumbentId, 'role'])}:</strong> ${repIndex.getIn([incumbentId, 'full_name'])}
                <br />
                <strong>Polling</strong>
                <br />
                <strong>In the ${regionsIndex.get[ccidCode, 'fragments']} counties that make up ${regionsIndex.getIn([ccidCode, 'state_abbr'])} State District ${parseInt(regionsIndex.getIn([ccidCode, 'district_no']), 10)}...</strong>
                <br />
                <strong>Happening:</strong> ${regionsIndex.getIn([ccidCode, 'polling', 'happening']).toFixed(2)}% of adults think global warming is happening compared to the national average of 72% (2020).
                <br />
                <strong>Regulate:</strong> ${regionsIndex.getIn([ccidCode, 'polling', 'regulate']).toFixed(2)}% of adults support regulating CO2 as a pollutant compared to the national average of 75% (2020).
                <br />
                <strong>Rebates:</strong> ${regionsIndex.getIn([ccidCode, 'polling', 'rebates']).toFixed(2)}% of adults support tax rebates for purchasing energy-efficient vehicles or solar panels compared to the national average of 82% (2020).
                <br />
                <strong>Research:</strong> ${regionsIndex.getIn([ccidCode, 'polling', 'research']).toFixed(2)}% want to see investment in renewable energy research (2020).
            `; 

            // create tooltip variable for the floating card div
            const tooltip = document.getElementById('floating-card')
            
            // store html in the tooltip, which will be displayed in the floating card div
            tooltip.innerHTML = html

        });

        // change cursor to pointer when hovering over a district
        map.on('mouseenter', 'upper', e => {
            if (e.features.length) {
                map.getCanvas().style.cursor = 'pointer';
            }
        });

        // change cursor back when it leaves a district
        map.on('mouseleave', 'places', function () {
            map.getCanvas().style.cursor = '';
        });

        // clean up on unmount
        return () => map.remove();
    
    }, [])

    return (
    <Wrapper>
        <Layout/>
        <MapContainer ref={mapContainer} style={{ width: '100%', height: '100%' }}/>
        <Sidebar>
            <div id="floating-card">
            <b>Is My District prepared for Climate Change?</b>
            <p>This map displays climate-specific legislation and socioeconomic data for all US state legislative districts.</p>
            </div>
        </Sidebar>
    </Wrapper>
    )

}

export default Map