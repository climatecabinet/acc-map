import React from 'react'
import PropTypes from 'prop-types'
import styled, { ThemeProvider, theme } from '../../../util/style'

import { Flex } from '../Grid'
import { isUnsupported } from '../../../util/dom'
import UnsupportedBrowser from './UnsupportedBrowser'

import Header from './Header'
import Footer from './Footer'

import config from '../../../config/meta'

const Wrapper = styled(Flex).attrs({ flexDirection: 'column' })`
  height: 100%;
`

const Content = styled.div`
  flex: 1 1 auto;
  overflow-y: auto;
`

const Layout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <Wrapper>
      <Header siteTitle={config.siteTitle} />
      {isUnsupported ? <UnsupportedBrowser /> : <Content>{children}</Content>}
      <Footer />
    </Wrapper>
  </ThemeProvider>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
