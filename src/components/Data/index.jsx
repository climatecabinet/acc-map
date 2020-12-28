import { graphql, useStaticQuery } from 'gatsby'
import { fromJS } from 'immutable'
import { isDebug } from '../../../util/dom'

export const useData = () => {
  const data = useStaticQuery(graphql`
  query {
    allMongodbRegions {
      regions {
          _id
          state_fips
          state_abbr
          ccid
          name
        }
      }
    }
  `).allMongodbRegions.regions.map(region => {
    const { ccid } = region

    return { 
      ...region, 
      ccid: parseInt(ccid,10)
    }
  })

  const index = data.reduce((result, item) => {
    result[item.ccid] = item
    return result
  }, {})

  if (isDebug) {
    window.data = data
    window.index = index
  }

  return [fromJS(data), fromJS(index)]
}