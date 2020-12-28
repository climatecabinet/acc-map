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
  
const ListItem = ({ name, ccid, ...props }) => (
    <Wrapper {...props}>
      <Columns>
        <Column>
          <Name>{name}</Name>
        </Column>
        <Column>
          <Text textAlign="right">
          CCID: {ccid}
          </Text>
        </Column>
      </Columns>
    </Wrapper>
)
  
ListItem.propTypes = {
    ccid: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
}
  
// only rerender on ID change
export default memo(
    ListItem,
    ({ ccid: prevID }, { ccid: nextID }) => nextID === prevID
)