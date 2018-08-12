import axios from 'axios'

import * as actionTypes from './actionTypes'
import config from '../../app.config'

export const setAuth = value => ({
  type: actionTypes.SET_AUTH,
  value,
})

export const auth = form => {
  return dispatch => {
    return axios
      .post(config.apiendpoint, {
        query: `
        query auth{
          auth(email:"${form.email}", password:"${form.password}") {
            status
            token
          }
        }
      `,
      })
      .then(res => {
        const auth = res.data.data.auth
        if (auth.status === 'ok') {
          return auth.token
        } else {
          return false
        }
      })
      .catch(err => console.log(err))
  }
}