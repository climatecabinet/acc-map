import { graphql, useStaticQuery } from 'gatsby'
import { fromJS } from 'immutable'
import { isDebug } from '../../../util/dom'

/**
 * Custom react hook to wrap getting data using GraphQL in gatsby
 * Returns [data, index]
 */

// export const useData = () => {
//     const data = useStaticQuery(graphql`
//       query CountiesDataQuery {
//         allCountiesJson {
//           edges {
//             node {
//                 id
//                 name
//                 cmlscore
//                 population
//                 bounds
//                 pollution_score
//                 o3_max_pred
//                 pm_mean_pred
//                 SFcount
//                 TRIcount
//                 population_score
//                 nwpopulation_p
//                 poverty_p
//                 educational_attainment_p
//                 housing_burden_p
//                 age_0to9
//                 age_65
//                 age_0to9_p
//                 age_65_p
//                 cardiovascular_disease
//                 low_birth_weight
//                 o3_max_pred
//                 pm_mean_pred
//             }
//           }
//         }
//       }
//     `).allCountiesJson.edges.map(({ node }) => {
//       // parse data types as needed
//       const { id } = node
  
//       return {
//         ...node,
  
//         // convert id back to integer
//         id: parseInt(id, 10)
//       }
//     })
  
//     // Create index of data by ID
//     const index = data.reduce((result, item) => {
//       /* eslint-disable no-param-reassign */
//       result[item.id] = item
//       return result
//     }, {})
  
//     if (isDebug) {
//       window.data = data
//       window.index = index
//     }
  
//     // return data as immutable objects
//     return [fromJS(data), fromJS(index)]
//   }