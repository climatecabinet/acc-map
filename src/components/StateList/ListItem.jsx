import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Text } from 'rebass'
import { Columns, Column } from '../Grid'
import styled, { themeGet, theme } from '../../../util/style'

const Wrapper = styled(Text).attrs({
    fontSize: ['0.9rem', '0.8rem', '0.9rem'],
})`
    line-height: 1.2;
    padding: 0.5rem 1rem;
    cursor: pointer;

    color: ${themeGet('colors.grey.600')};
    font-weight: 100;

    &:hover {
        background-color: ${theme.colors.primary[100]}50;
    }

    &:not(:first-child) {
        border-top: 1px solid ${themeGet('colors.grey.100')};
        padding-top: 0.5rem;
    }
`

const Name = styled.div`
    color: ${themeGet('colors.primary.500')};
    font-size: 1rem;
    font-weight: normal;
`
  
const ListItem = ({ name, state_abbr, district_no, ...props }) => (
    <Wrapper {...props}>
      <Columns>
        <Column>
          <Name>{state_abbr} {name}</Name>
        </Column>
        <Column>
          <Text textAlign="right">
          District {district_no}
          </Text>
        </Column>
      </Columns>
    </Wrapper>
)
  
ListItem.propTypes = {
    ccid: PropTypes.number.isRequired,
    state_abbr: PropTypes.string.isRequired,
    district_no: PropTypes.string.isRequired,
}
  
// only rerender on ID change
export default memo(
    ListItem,
    ({ ccid: prevID }, { ccid: nextID }) => nextID === prevID
)