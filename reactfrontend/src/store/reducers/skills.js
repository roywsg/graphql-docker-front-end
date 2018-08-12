import * as actionTypes from '../actions/actionTypes'

const initialState = {
  skills: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SKILLS:
      return {...state, skills: action.skills}

    case actionTypes.SET_SKILL:
      const newSkills = state.skills.map(s => {
        if (s.id === action.skill.id) {
          s = action.skill
        }
        return s
      })
      return {...state, skills: newSkills}

    case actionTypes.DEL_SKILL:
      const newSkills2 = state.skills.filter(s => s.id !== action.id)
      return {...state, skills: newSkills2}
    default:
      return state
  }
}
