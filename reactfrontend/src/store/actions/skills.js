import axios from 'axios'

import * as actionTypes from './actionTypes'
import config from '../../app.config'

export const setSkills = skills => ({
  type: actionTypes.SET_SKILLS,
  skills,
})

export const setSkill = skill => ({
  type: actionTypes.SET_SKILL,
  skill,
})

export const addSkill = skill => dispatch =>
  axios.post(config.apiendpoint, {
    query: `
      mutation addSkill {
        addSkill(id:"${skill.id}", name:"${skill.name}", level:${parseFloat(skill.level)}, type:"${skill.type}") {
          id
          name
          level
          type
        }
      }
    `,
  })

export const getSkills = () => dispatch =>
  axios.post(config.apiendpoint, {
    query: `
      query getSkills {
        skills {
          status
          skills {
            id
            name
            level
            type
          }
        }
      }
    `,
  })

export const editSkill = skill => dispatch =>
  axios.post(config.apiendpoint, {
    query: `
      mutation editSkill {
        editSkill(id:"${skill.id}",name:"${skill.name}",level:${parseFloat(skill.level)},type:"${skill.type}") {
          id
          name
          level
          type
        }
      }
    `,
  })

export const deleteSkill = id => dispatch =>
  axios.post(config.apiendpoint, {
    query: `
      mutation deleteSkill{
        deleteSkill(id:"${id}"){
          id
          name
          level
          type
        }
      }
    `,
  })
