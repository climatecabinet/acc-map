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
        incumbents
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
      representatives {
        _id
        full_name
        party
        role
      }
    }
  }
  `)
  // .allMongodbRegions.regions.map(region => {
  //   const { ccid } = region

  //   return { 
  //     ...region
  //   }
  // })

  // const index = data.reduce((result, item) => {
  //   result[item.ccid] = item
  //   return result
  // }, {})

  // if (isDebug) {
  //   window.data = data
  //   window.index = index
  // }


  const regionsData = data.allMongodbRegions.regions.map(region => {
    const { ccid } = region

    return { 
      ...region
    }
  })

  // const repData = data.allMongodbRegions.representatives.map(representative => {
  //   const { _id } = representative

  //   return { 
  //     ...representative
  //   }
  // })

  const regionsIndex = regionsData.reduce((result, item) => {
    result[item.ccid] = item
    return result
  }, {})

  // const repIndex = repData.reduce((result, item) => {
  //   result[item._id] = item
  //   return result
  // }, {})

  // console.log(repIndex)

  if (isDebug) {
    window.data = regionsData
    window.index = regionsIndex
  }

  // return [fromJS(data), fromJS(index)]
  return [fromJS(regionsData), fromJS(regionsIndex)]
  // , fromJS(index)] // the index is the ccid (as a string)
}

// helpful documentation for working with immutable lists:
// https://thomastuts.com/blog/immutable-js-101-maps-lists.html
// https://immutable-js.github.io/immutable-js/, specifically the Nested Structures section

// help documentation for merging objects and arrays:
// https://stackoverflow.com/questions/46849286/merge-two-array-of-objects-based-on-a-key