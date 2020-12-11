import React, { useState, useRef, useContext } from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import { FixedSizeList as List } from 'react-window'
import useDimensions from 'react-use-dimensions'

import {
    Context as CrossfilterContext,
    SET_FILTER,
  } from '../Crossfilter'
  import { Box, Flex, Columns, Column } from '../Grid'
  import styled, { themeGet } from '../../../util/style'
  import SearchBar from './SearchBar'
  import SortBar from './SortBar'
  import ListItem from './ListItem'

const sortOptions = [
    { label: "name", sortFunc: (a, b) => (a.get("name") > b.get("name") ? 1 : -1) },
    { label: "state", sortFunc: (a, b) => b.get("state_abbr") - a.get("state_abbr") },
    { label: "district number", sortFunc: (a, b) => b.get("district_no") - a.get("district_no") }
]

export const Wrapper = styled(Flex).attrs({
    flex: '1 1 auto', 
    flexDirection: 'column',
})``

export const Count = styled.span`
    color: ${themeGet('colors.grey.600')};
    font-size: 0.8em;
    line-height: 1.2;
`

export const ListWrapper = styled.div`
    flex: 1 1 auto;
`
  
export const NoResults = styled(Box)`
    color: ${themeGet('colors.grey.600')};
    margin-top: 2rem;
    text-align: center;
`

const StateList = ({ onSelect }) => {
    const { state, dispatch: filterDispatch } = useContext(CrossfilterContext)
  
    const listRef = useRef(null)
    const [listWrapperRef, { height: listHeight }] = useDimensions()
    const [sortIdx, setSortIdx] = useState(2) // default: high to low 
  
    const handleQueryChange = value => {
      filterDispatch({
        type: SET_FILTER,
        payload: {
          field: 'name',
          filterValue: value,
        },
      })
    }
  
    const handleSortChange = idx => {
      if (idx === sortIdx) return
  
      setSortIdx(idx)
  
      // reset list to top
      if (listRef.current) {
        listRef.current.scrollTo(0)
      }
    }
  
    const data = state.get('data')
    const sortedData = data.sort(sortOptions[sortIdx].sortFunc)

    return (
        <Wrapper>
            <Columns px="1rem" alignItems="baseline">
            <Column>
                <Count> {data.size} currently visible</Count>
            </Column>
            <Column>
                <SortBar
                index={sortIdx}
                options={sortOptions}
                onChange={handleSortChange}
                />
            </Column>
            </Columns>

            <SearchBar
            value={state.get("filters", Map()).get("name", "")}
            placeholder="Enter the name of a region"
            onChange={handleQueryChange}
            />

            {data.size > 0 ? (
            <ListWrapper ref={listWrapperRef}>
                {listHeight ? (
                <List
                    ref={listRef}
                    itemData={sortedData.toJS()}
                    height={listHeight}
                    itemSize={64}
                    itemCount={sortedData.size}
                    itemKey={(i, items) => items[i].id}
                >
                    {({ index, data: listData, style }) => {
                        const item = listData[index]
                        return (
                            <ListItem
                            onClick={() => onSelect(item.id)}
                            {...item}
                            style={style}
                            />
                        )
                    }}
                </List>
                ) : null}
            </ListWrapper>
        ) : (
            <NoResults>No visible regions...</NoResults>
        )}
        </Wrapper>
    )
}

export default StateList