import React from 'react'

import styled, { themeGet } from '../../../util/style'

import { Flex } from '../Grid'
import { OutboundLink } from '../Link'

import {
  FaDownload,
  FaLink,
  FaFacebook,
  FaTwitter
} from "react-icons/fa"

const Wrapper = styled(Flex).attrs({
  alignItems: 'center',
  justifyContent: 'space-between',
})`
  flex: 0;
  background-color: ${themeGet('colors.primary.900')};
  padding: 0.25em 1em;
  font-size: 0.7rem;
  color: #fff;

  a {
    color: #fff;
  }
`

const DownloadIcon = styled(FaDownload)`
  width: 1em;
  height: 1em;
  margin-right: 0.25em;
  opacity: 0.6;
`

const LinkIcon = styled(FaLink)`
  width: 1em;
  height: 1em;
  margin-right: 0.25em;
  opacity: 0.6;
`

const TwitterIcon = styled(FaTwitter)`
  width: 1em;
  height: 1em;
  margin-right: 0.25em;
  opacity: 0.6;
`

const FacebookIcon = styled(FaFacebook)`
  width: 1em;
  height: 1em;
  margin-right: 0.25em;
  opacity: 0.6;
`

const Footer = () => (
  <Wrapper as="footer">
    <div>
      <DownloadIcon />
      <OutboundLink
        from="/"
        to="https://climatecabinet.org/"
        target="_blank"
      >
        Download the Data
      </OutboundLink>{" "}
    </div>
    <div>
      <span style={{ paddingRight: "10px" }}>Share on Social Media:</span>
      <OutboundLink
        from="/"
        to="https://climatecabinet.org/"
        target="_blank"
      >
        <LinkIcon />
        <span style={{ paddingRight: "10px" }}></span>
      </OutboundLink>
      <OutboundLink from="/" to="https://climatecabinet.org/" target="_blank">
        <TwitterIcon />
        <span style={{ paddingRight: "10px" }}></span>
      </OutboundLink>
      <OutboundLink from="/" to="https://climatecabinet.org/" target="_blank">
        <FacebookIcon />
        <span style={{ paddingRight: "10px" }}></span>
      </OutboundLink>
    </div>
  </Wrapper>
)

export default Footer
