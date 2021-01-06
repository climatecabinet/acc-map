import React, { useEffect, useRef, useState} from 'react'
import ReactDOM from 'react-dom'
import mapboxgl from 'mapbox-gl'
import { fromJS } from 'immutable'
import { siteMetadata } from '../../../gatsby-config'
import { sources, layers,  config } from '../../../config/map'
import { useData } from '../Data'
import styled from '../../../util/style'
import Layout from '../Layout'
import LayerToggle from './LayerToggle'
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
    top: calc(47px + 30px);
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

const Tooltip = ({ feature }) => {
    const { id } = feature.properties;
  
    return (
      <div id={`tooltip-${id}`}>
        <strong>State:</strong> {feature.properties.state_abbr}
        <br />
        <strong>District Number:</strong> {feature.properties.name}
        <br />
        <strong>Incumbent:</strong> {feature.properties.incumbents}
        <br />
        <strong>Asthma Rate (%):</strong> {feature.properties.asthma}
        <br />
        <strong>Clean Jobs (%):</strong> {feature.properties.jobs}
      </div>
    );
};

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
    const [activeLayer, setActiveLayer] = useState('upper') // options are upper and lower
    const tooltipRef = useRef(new mapboxgl.Popup({ offset: 15 }))

    // put local data here?
    const data = useData()

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

        map.on('load', () => { //On map load, we want to do some stuff

            // snapshot existing map config
            baseStyleRef.current = fromJS(map.getStyle())
            window.baseStyle = baseStyleRef.current

            map.addLayer({ 
              'id': 'upper',
              'source': {
                'type': 'geojson',
                'data': 'https://raw.githubusercontent.com/shelbygreen/acc-map/master/tools/nj-sldu.geojson'
              },
              'type': 'fill',
              'paint': {
                'fill-color': 'rgba(255, 87, 51, 0.4)',
                'fill-outline-color': 'rgba(255, 75, 37, 1)'
              }
            });

            // map.setFilter('upper', ['in', 'ccid'].concat(['34027U', '34034U', '34006U', '34020U']));

            map.on('click', 'upper', function (mapElement) {
                const ccidCode = mapElement.features[0].properties.ccid // grabs the ccid in the upper layer

                // use the ccidCode to filter the mongodb data (stored in the data variable)
                // add that data to the feature properties
                // based on a custom schema?

                // console.log(data);

                // tooltip features. can modify to rely on mapbox popup code instead
                const features = map.queryRenderedFeatures(mapElement);
                if (features.length) {
                    const feature = features[0];

                    // Create tooltip node
                    const tooltipNode = document.createElement('div');
                    ReactDOM.render(<Tooltip feature={feature} />, tooltipNode);

                    // Set tooltip on map
                    tooltipRef.current
                    .setLngLat(mapElement.lngLat)
                    .setDOMContent(tooltipNode)
                    .addTo(map);
                }
            });

        });

        // clean up on unmount
        return () => map.remove();
    }, [data])

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
        <Layout />
        <MapContainer ref={mapContainer} style={{ width: '100%', height: '100%' }}/>
        {/* <LayerToggle
                        value={activeLayer}
                        options={[
                            { value: 'upper', label: 'Senate' },
                            { value: 'lower', label: 'House' },
                        ]}
                        onChange={handleLayerToggle}
                    /> */}
        <Sidebar>
            <p></p>
            <p>Texas State District 28</p>
            <p>Senator or Representative</p>
            <p>Dropdown for Asthma rates and Clean Energy jobs</p>
            <p>Clickable List of Relevant Legislation, 2015-2020</p>
        </Sidebar>
    </Wrapper>
    )

}

export default Map