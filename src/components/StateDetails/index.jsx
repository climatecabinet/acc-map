import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'rebass'
import { FaRegTimesCircle } from 'react-icons/fa'

import { Columns, Column, Flex } from '../Grid'
import ExpandableParagraph from '../Elements/ExpandableParagraph'
import Tabs, { Tab as BaseTab } from '../Tabs'
import styled, { themeGet } from '../../../util/style'
// import { readibleNumber } from '../../../util/format'

import { Button } from '../Button'
// import Progress from './ProgressBar'
// import PopulationListItem from "./PopulationItem"
// import PollutionListItem from "./PollutionItem"

const Header = styled.div`
  padding: 0.5rem 1rem;
  background-color: ${themeGet("colors.primary.100")};
  border-bottom: 1px solid ${themeGet("colors.grey.200")};
  line-height: 1.2;
`

const Title = styled(Text).attrs({
  fontSize: ["1rem", "1rem", "1.5rem"]
})``

const Subtitle = styled(Text).attrs({
  fontSize: ["0.8rem", "0.8rem", "1rem"]
})``

const Help = styled(ExpandableParagraph)`
  font-size: 0.8rem;
  margin: 0 1rem 1rem;
  color: ${themeGet("colors.grey.700")};
`

const BackIcon = styled(FaRegTimesCircle).attrs({ size: "1.5rem" })`
  height: 1.5rem;
  width: 1.5rem;
  cursor: pointer;
  color: ${themeGet("colors.grey.600")};
  &:hover {
    color: ${themeGet("colors.grey.900")};
  }
`

const Score = styled(Text).attrs({ textAlign: "right" })`
  font-size: 1.25rem;
`

const ZoomButton = styled(Button)`
  font-size: 0.8rem;
  margin-bottom: 1rem;
  padding: 0.1rem 0.5rem;
`

const TabHeader = styled(Flex).attrs({
  justifyContent: 'space-between',
})`
  font-size: 1.25rem;
`

const Value = styled.div`
  padding-left: 0rem;
  color: ${themeGet("colors.grey.900")};
`

const Section = styled.section`
  &:not(:first-child) {
    padding-top: 0.5rem;
    margin-top: 0.5rem;
    border-top: 1px solid ${themeGet("colors.grey.200")};
  }
`

const TabContainer = styled(Tabs)`
  height: 100%;
`

const Tab = styled(BaseTab)`
  padding: 1rem;
  flex: 1 1 auto;
  overflow-y: auto;
`

const StateDetails = ({
  ccid, 
  name,
  showZoom,
  onBack,
  onZoomTo
}) => {

  const handleZoom = () => {
    onZoomTo()
  }

  return (
    <>
      <Header>
        <Columns>
          <Column flex={1}>
            <Title>{name}</Title>
            {ccid}
          </Column>
          <Column flex={0}>
            <BackIcon onClick={onBack} />
          </Column>
        </Columns>
        {/* <Subtitle width="100%">
          <Columns>
            <Column>{stateNames[state]}</Column>
            <Column>
              <Acres>{formatNumber(acres, 0)} acres</Acres>
            </Column>
          </Columns>
        </Subtitle> */}
      </Header>

      <Tab>
        <Section>
            <TabHeader>Background:</TabHeader>
            {name}. 
        </Section>
      </Tab>
    </>
  )
}

StateDetails.propTypes = {
  ccid: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  showZoom: PropTypes.bool,
  onBack: PropTypes.func,
  onZoomTo: PropTypes.func
}

StateDetails.defaultProps = {
  showZoom: true,
  onBack: () => {},
  onZoomTo: () => {}
}
export default StateDetails