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
    overflow: hidden;
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

// const Tooltip = ({ feature }) => {
//     const { id } = feature.properties;
//
//     return (
//       <div id={`tooltip-${id}`}>
//         <strong>State:</strong> {feature.properties.name}
//
//       </div>
//     );
// };

// <br />
// <strong>District Number:</strong> {feature.properties.name}
// <br />
// <strong>Incumbent:</strong> {feature.properties.incumbents}
// <br />
// <strong>Asthma Rate (%):</strong> {feature.properties.asthma}
// <br />
// <strong>Clean Jobs (%):</strong> {feature.properties.jobs}

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
    const tooltipRef = useRef(new mapboxgl.Popup({ offset: 15 }))
    const [activeLayer, setActiveLayer] = useState('upper') // options are upper and lower
    // const tooltipRef = useRef(new mapboxgl.Popup({ offset: 15 }))

    // data from MongoDB/GraphQL query
    const [data, index] = useData()

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

            // // // add every source
            // // Object.entries(sources).forEach(([id, source]) => {
            // //     map.addSource(id, source)
            // // })
            //
            // // add every layer
            // layers.forEach(layer => {
            //     map.addLayer(layer)
            // })

            //TODO: potentially a faster way than reloading geojson as source.
            //https://github.com/mapbox/mapbox-gl-js/issues/3018#issuecomment-277117802

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

            // Shelby -- any idea why this outline thickener isn't showing up?
            map.addLayer({
              'id': 'upper-outline',
              'source': {
                'type': 'geojson',
                'data': 'https://raw.githubusercontent.com/shelbygreen/acc-map/master/tools/nj-sldu.geojson' // <--- Add the Map ID you copied here
              },
              'type': 'line',
              'paint': {
                'line-width': '6',
                'line-color': 'rgba(50, 50, 50, 0.7)'
              }
            });


            map.on('click', 'upper', function (mapElement) {
                const ccidCode = mapElement.features[0].properties.ccid

                var popup_test = document.getElementById("floating-card")
                               //
                const html = `
                    <strong>${index.getIn([ccidCode, 'state_abbr'])} State District ${index.getIn([ccidCode, 'district_no'])}</strong>
                    <br />
                    <strong>Incumbent:</strong> ${index.getIn([ccidCode, 'incumbents', 0])}
                    <br />
                    <strong>Adult Asthma Rate (%):</strong> ${((100 * index.getIn([ccidCode, 'asthma', 'child'])) / index.getIn([ccidCode, 'asthma', 'population'])).toFixed(2)}
                    <br />
                    <strong>Clean Jobs (%):</strong> ${index.getIn([ccidCode, 'jobs', 'perc_of_state_jobs'])}
                `;

                popup_test.innerHTML = html

                new mapboxgl.Popup({
                  anchor: 'left'
                })

                .setLngLat(mapElement.lngLat)
                .setHTML(html)
                .addTo(map);

                // // tooltip features
                // const features = mapElement.features
                // if (features.length) {
                //   const feature = features[0];
                //
                //   const ccidCode = mapElement.features[0].properties.ccid;
                //   // const stateDistrict = State District ${index.getIn([ccidCode, 'district_no'])
                //
                //
                //   // Create tooltip node
                //   const tooltipNode = document.createElement('div');
                //   ReactDOM.render(<Tooltip feature={feature} />, tooltipNode);
                //
                //   // Set tooltip on map
                //   tooltipRef.current
                //
                //   .setLngLat(mapElement.lngLat)
                //   .setDOMContent(tooltipNode)
                //   .addTo(map);
                // }

            });

        });

        // change cursor to pointer when user hovers over a clickable feature
        map.on('mouseenter', e => {
            if (e.features.length) {
                map.getCanvas().style.cursor = 'pointer';
            }
        });


        // // pop-up features
        // map.on('click', (e) => {
        //     const features = map.queryRenderedFeatures(e.point);
        //     if (features.length) {
        //         const feature = features[0];

        //     // Create tooltip node
        //     const tooltipNode = document.createElement('div');
        //     ReactDOM.render(<Tooltip feature={feature} />, tooltipNode);

        //     // Set tooltip on map
        //     tooltipRef.current
        //     .setLngLat(e.lngLat)
        //     .setDOMContent(tooltipNode)
        //     .addTo(map);
        //     }
        // });

        // map.on('click', ('upper-layer', function (e)) {
        //     new mapboxgl.Popup()
        //     .setLngLat(e.lngLat)
        //     .setHTML(e.features[0].properties.name)
        //     .addTo(map);
        // })

        // show popup on click
        // map.on('mouseenter', 'upper-layer', function () {
        //     map.getCanvas().style.cursor = 'pointer';
        //     })

        // // change it back to a pointer when it leaves
        // map.on('mouseleave', 'upper-layer', function () {
        //     map.getCanvas().style.cursor = '';
        // })

        // clean up on unmount
        return () => map.remove();
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
        <Sidebar> <div class="col-lg-3" id="floating-card"><p>"hello"</p></div> </Sidebar>


    </Wrapper>
    )
    //
    // <p>move popup information to here and style according to Sketch</p>
    // <p>{currDistrict}</p>
    // <p>Texas State District 28</p>
    // <p>Senator or Representative</p>
    // <p>Dropdown for Asthma rates and Clean Energy jobs</p>
    // <p>Clickable List of Relevant Legislation, 2015-2020</p>

}

export default Map
