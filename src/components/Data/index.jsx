import { graphql, useStaticQuery } from 'gatsby'
import { fromJS } from 'immutable'
import { isDebug } from '../../../util/dom'

/**
 * Custom react hook to wrap getting data using GraphQL in gatsby
 * Returns [data, index]
 */

export const useData = () => {
  const data = useStaticQuery(graphql`
  query data {
    allMongodbRegions {
      regions {
          _cls
          state_fips
          state_abbr
          ccid
          name
        }
      }
    }
`)

// create index of data by ccid
const index = data.reduce((result, item) => {
  result[item.ccid] = item
  return result
}, {})

if (isDebug) {
  window.data = data
  window.index = index
}

// return data as immutable objects
return [fromJS(data), fromJS(index)]

}