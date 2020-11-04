import React from 'react'
import SEO from '../components/seo'
import Layout from '../components/Layout/index'
import styled, { themeGet } from '../../util/style'
import Flex from '../components/Grid'

// const Wrapper = styled(Flex)`
//     height: 100%;
// `

const Explore = () => {
    return (
        <Layout>
            <SEO title="Explore" />
        </Layout>
    )
}

export default Explore