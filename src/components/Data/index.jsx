import { graphql, useStaticQuery } from 'gatsby'
import { fromJS } from 'immutable'
import { isDebug } from '../../../util/dom'

export const useData = () => {
  const data = useStaticQuery(graphql`
  query {
    allMongodbRegions {
      regions {
        state_fips
        state_abbr
        ccid
        name
        incumbent
        district_no
        asthma {
          population
          adult
          child
          non_white
          poverty
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
  `).allMongodbRegions.regions.map(region => {
    const { ccid } = region

    return { 
      ...region, 
      // ccid: parseInt(ccid,10)
    }
  })

  // console.log(data);

  // const representativesData = useStaticQuery(graphql`
  //   query {
  //     allMongodbRegions {
  //       representatives {
  //           full_name
  //           party
  //           role
  //       }
  //     }
  //   }
  //   `).allMongodbRegions.representatives.map(representative => {
  //     const { ccid } = representative

  //     return {
  //       ...representative
  //     }
  //   })

  // data = [regionsData, representativesData]

  const index = data.reduce((result, item) => {
    result[item.ccid] = item
    return result
  }, {})

  if (isDebug) {
    window.data = data
    window.index = index
  }

  return [fromJS(data), fromJS(index)] // the index is the ccid (as a string)
}
// helpful documentation for working with immutable lists:
// https://thomastuts.com/blog/immutable-js-101-maps-lists.html
// https://immutable-js.github.io/immutable-js/, specifically the Nested Structures section