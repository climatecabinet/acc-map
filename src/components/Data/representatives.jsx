import { graphql, useStaticQuery } from 'gatsby'
import { fromJS } from 'immutable'
import { isDebug } from '../../../util/dom'

export const useRepData = () => {
  const data = useStaticQuery(graphql`
  query {
    allMongodbRegions {
      representatives {
        _id
        full_name
        party
        role
      }
    }
  }
  `)

  const repData = data.allMongodbRegions.representatives.map(representative => {
    const { _id } = representative

    return { 
      ...representative
    }
  })

  console.log(repData)

  const repIndex = repData.reduce((result, item) => {
    result[item._id] = item
    return result
  }, {})

  if (isDebug) {
    window.data = repData
    window.index = repIndex
  }

  return [fromJS(repData), fromJS(repIndex)]
}

// helpful documentation for working with immutable lists:
// https://thomastuts.com/blog/immutable-js-101-maps-lists.html
// https://immutable-js.github.io/immutable-js/, specifically the Nested Structures section

// help documentation for merging objects and arrays:
// https://stackoverflow.com/questions/46849286/merge-two-array-of-objects-based-on-a-key