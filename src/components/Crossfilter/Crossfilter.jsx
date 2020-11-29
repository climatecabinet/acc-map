import { useReducer, useRef } from 'react'

import { Map, List, Set } from 'immutable'

import Crossfilter from 'crossfilter2'
import { isDebug } from '../../../util/dom'
import { countByDimension, countFiltered } from './util'

// Actions
export const RESET_FILTERS = 'RESET_FILTERS'
export const SET_FILTER = 'SET_FILTER' // payload is {field, filterValue}

// Incoming data is an immutableJS List of Maps
export const useCrossfilter = (data, filters) => {
  const crossfilterRef = useRef(null)
  const dimensionsRef = useRef(null)

  // payload: {type: "SOME_TYPE", payload: <the_data>}
  const reducer = (state, { type, payload }) => {
    const { current: crossfilter } = crossfilterRef
    const { current: dimensions } = dimensionsRef

    if (isDebug) {
      console.log(`Handling ${type}`, payload)
      console.log('Prev state', state.toJS())
    }

    let newState = state

    switch (type) {
      case SET_FILTER: {
        const { field, filterValue } = payload
        const dimension = dimensions[field]

        if (!filterValue || filterValue.size === 0) {
          // there are no filter values, so clear filter on this field
          dimension.filterAll()
        } else {
          const filterFunc = dimension.config.filterFunc(filterValue)
          dimension.filterFunction(filterFunc)
        }

        newState = state.merge({
          // convert Array from crossfilter back to an immutable List
          data: List(crossfilter.allFiltered()),
          dimensionCounts: countByDimension(dimensions),
          filteredCount: countFiltered(crossfilter),
          filters: state.get('filters').set(field, filterValue),
        })
        break
      }

      case RESET_FILTERS: {
        const { fields } = payload

        let newFilters = state.get('filters')

        fields.forEach(field => {
          dimensions[field].filterAll()

          const filter = newFilters.get(field)
          newFilters = newFilters.set(field, filter ? filter.clear() : Set())
        })

        newState = state.merge({
          // convert Array from crossfilter back to an immutable List
          data: List(crossfilter.allFiltered()),
          dimensionCounts: countByDimension(dimensions),
          filteredCount: countFiltered(crossfilter),
          filters: newFilters,
        })
        break
      }

      default: {
        console.error('unhandled action type', type)
        break
      }
    }

    if (isDebug) {
      console.log('Next state', newState.toJS())
    }

    return newState
  }

  // Initialize crossfilter and dimensions when useReducer is first setup
  const initialize = () => {
    // crossfilter depends on Array methods at the top level
    // so we shallowly convert the List to an Array.
    const crossfilter = Crossfilter(data.toArray())

    const dimensions = {}
    filters.forEach(filter => {
      const { field, isArray, getValue } = filter
      // default `getValue` function is identify function for field
      // const dimensionFunction = getValue || (d => d[field])
      const dimensionFunction =
        getValue ||
        (record => {
          const value = record.get(field)
          // if incoming value is an immutableJS object, convert it to JS first
          if (value && value.toJS !== undefined) {
            return value.toJS()
          }
          return value
        })
      const dimension = crossfilter.dimension(dimensionFunction, !!isArray)
      dimension.config = filter
      dimensions[field] = dimension
    })

    crossfilterRef.current = crossfilter
    dimensionsRef.current = dimensions

    if (isDebug) {
      window.crossfilter = crossfilter
      window.dimensions = dimensions
    }

    // initial state
    return Map({
      data,
      filters: Map(),
      dimensionCounts: countByDimension(dimensions),
      filteredCount: countFiltered(crossfilter),
      total: data.size,
    })
  }

  return useReducer(reducer, undefined, initialize)
}
