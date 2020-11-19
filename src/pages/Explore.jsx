import React from 'react'
import SEO from '../components/seo'
import Layout from '../components/Layout/index'
import styled, { themeGet } from '../../util/style'
import { Flex } from '../components/Grid'
import Map from '../components/Map'
import Sidebar, { SidebarHeader } from '../components/Sidebar'
// import StateList from '../components/StateList'

const Wrapper = styled(Flex)`
    height: 100%;
`

const Snippet = styled(Flex)`
  font-size: 0.8rem;
  margin: 0 1rem 1rem;
  color: ${themeGet('colors.grey.700')};
`

const Explore = () => {
    return (
        <Layout>
            <SEO title="Explore" />
            <Wrapper>
                <Sidebar allowScroll={false}>
                    {/* StateDetails */}
                    <SidebarHeader title="Explore Legislative Districts" icon="map" />
                        <Snippet>
                            This map displays climate and socioeconomic data of every legislative
                            district in the United States. Click on a region in the list below or on the map 
                            for more detailed information.
                        </Snippet>
                        {/* <StateList /> */}
                </Sidebar>
                <Map />
            </Wrapper>
        </Layout>
    )
}

export default Explore