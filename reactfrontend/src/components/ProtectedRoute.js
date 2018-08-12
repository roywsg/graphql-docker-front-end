import Cookies from 'js-cookie'
import React from 'react'
import {Route, Redirect} from 'react-router-dom'

// export default ({component: Component, ...rest}) => (isAuth ? <Route {...rest} /> : <Redirect to="/" />)

export default ({component: Component, ...rest}) => {
  let isAuth = false
  if (Cookies.get('token')) {
    isAuth = true
  }
  return <Route {...rest} render={props => (isAuth ? <Component {...props} /> : <Redirect exact to="/" push />)} />
}
