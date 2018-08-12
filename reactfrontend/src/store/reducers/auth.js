import * as actionTypes from '../actions/actionTypes'

const initialState = {
  auth: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_AUTH:
      return {...state, auth: action.value}
    default:
      return state
  }
}
