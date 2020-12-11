import { Map } from 'immutable'

// import { boundsOverlap } from '../util/map'

/**
 * Filter configuration.
 * Each non-internal field is shown to the user in the order defined below.
 *
 * IMPORTANT: each record is an `immutableJS` `Map` object - you must use `Map`
 * methods for retrieving field values.
 * See: https://immutable-js.github.io/immutable-js/docs/#/Map
 *
 *
 * Each filter must have: `{field, filterFunc}`
 *
 * `field` - the name of the field in the record.
 *
 * `filterFunc` (function) - a function that takes as input a list of filter
 * values selected by the user, and returns a function that
 * takes a value from each record in the data and returns true
 * if the value is included in the filter and false otherwise.
 *
 *
 * Each filter that is displayed using filter bars (`internal: false`)
 * must have: `{values, labels}` as well.
 *
 * Optional properties:
 * `isOpen` (bool) - if `true` show the filter in expanded state by default.  (default: `false`)
 *
 * `getValue` (function) - takes a record as input and returns
 * the value for that field.  It can transform the value as needed.
 * (default: returns the value for the `field`)
 * NOTE: `getValue` MUST return a native JS type, NOT an `immutableJS` type.
 *
 * `internal` (bool) - if `true` will not be displayed in the list
 * of filters shown to the user, but will still be added as a
 * filter (e.g., map bounds for filtering records).  (default: `false`)
 *
 * `isArray` - if `true`, the record has an array of values for that field
 * instead of a single value.  Crossfilter will index that record on each of those
 * values, so you can test the record to determine if it is in the filter in
 * the same way that you would test a field with a singular value.
 * See: https://github.com/crossfilter/crossfilter/wiki/API-Reference#dimension_with_arrays
 *
 * NOTE: `List` objects for this field will be automatically converted to native `Array`s by default unless
 * you provide your own `getValue` function.  If so, you MUST return a native `Array`.
 */

// TODO: migrate this into crossfilter reducer as the default
// returns true if passed in values contains the value
// values must be a Set
const hasValue = filterValues => value => filterValues.has(value)

export const filters = [
  {
    field: "name",
    internal: true,
    getValue: record => record.get("name"),
    filterFunc: value => name => name.includes(value)
  },
//   {
//     field: 'bounds',
//     internal: true,
//     filterFunc: mapBounds => Bounds =>
//       boundsOverlap(mapBounds, Bounds),
//   },
]