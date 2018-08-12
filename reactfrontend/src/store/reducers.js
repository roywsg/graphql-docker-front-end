import auth from './reducers/auth'
import skills from './reducers/skills'
import {combineReducers} from 'redux'

export const reducers = combineReducers({auth, skills})
