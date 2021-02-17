import { graphql, useStaticQuery } from 'gatsby'
import { fromJS } from 'immutable'
import { isDebug } from '../../../util/dom'

export const useData = () => {
  const data = useStaticQuery(graphql`
  query {
    allMongodbRegions {
      regions(limit: 10000) {
        _id
        state_fips
        state_abbr
        ccid
        name
        incumbents {
          name
          rep
        }
        fragments {
          perc_of_whole
          population
          region
        }
        district_no
        asthma {
          population
          adult
          child
          non_white
          poverty
        }
        polling {
          happening
          regulate
          rebates
          research
        }
        jobs {
          perc_of_state_jobs
          installations_count {
            residential
            commercial
            utility
            total
          }
        }
      }
    }
  }
  `)

  const regionsData = data.allMongodbRegions.regions.map(region => {
    const { ccid } = region

    return { 
      ...region
    }
  })

  const regionsIndex = regionsData.reduce((result, item) => {
    result[item.ccid] = item
    return result
  }, {})

  if (isDebug) {
    window.data = regionsData
    window.index = regionsIndex
  }

  return [fromJS(regionsData), fromJS(regionsIndex)]
}

// helpful documentation for working with immutable lists:
// https://thomastuts.com/blog/immutable-js-101-maps-lists.html
// https://immutable-js.github.io/immutable-js/, specifically the Nested Structures section

// help documentation for merging objects and arrays:
// https://stackoverflow.com/questions/46849286/merge-two-array-of-objects-based-on-a-key