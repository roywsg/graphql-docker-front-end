import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

import config from '../app.config'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    skills: [],
  },
  getters: {
    getSkills: state => {
      return state.skills
    },
  },
  mutations: {
    setSkills(state, skills) {
      state.skills = skills
    },
    addSkill(state, skill) {
      state.skills = [...state.skills, skill]
    },
    removeSkill(state, id) {
      const oldSkillIdx = state.skills.findIndex(s => s.id === id)
      state.skills.splice(oldSkillIdx, 1)
    },
    updateSkill(state, skill) {
      const newSkills = state.skills
      const oldSkillIdx = newSkills.findIndex(s => s.id === skill.id)
      newSkills[oldSkillIdx] = skill
      state.skills = [...newSkills]
    },
  },
  actions: {
    getSkills(context) {
      axios
        .post(config.apiendpoint, {
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
        .then(res => {
          context.commit('setSkills', res.data.data.skills.skills)
        })
        .catch(err => console.log(err))
    },
    onAdd(context, skill) {
      axios
        .post(config.apiendpoint, {
          query: `
            mutation addSkill {
              addSkill(id:"${skill.id}", name:"${skill.name}",
              level:${parseFloat(skill.level)}, type:"${skill.type}")
              {
                id
                name
                level
                type
              }
            }
          `,
        })
        .then(res => {
          const skill = res.data.data.addSkill
          context.commit('addSkill', skill)
        })
        .catch(err => console.log(err))
    },
    onEdit(context, skill) {
      axios
        .post(config.apiendpoint, {
          query: `
            mutation editSkill {
              editSkill(id:"${skill.id}", name:"${skill.name}", level:${skill.level}, type:"${skill.type}") {
                id
                name
                level
                type
              }
            }
          `,
        })
        .then(res => {
          const skill = res.data.data.editSkill
          context.commit('updateSkill', skill)
        })
        .catch(err => console.log(err))
    },
    onDelete(context, id) {
      axios
        .post(config.apiendpoint, {
          query: `
            mutation deleteSkill {
              deleteSkill(id:"${id}") {
                id
                name
                level
                type
              }
            }
          `,
        })
        .then(res => {
          context.commit('removeSkill', id)
        })
        .catch(err => console.log(err))
    },
  },
})

export default store
