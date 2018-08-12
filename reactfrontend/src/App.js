import React, {Component} from 'react'
import Cookies from 'js-cookie'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'

import Login from './components/Login'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'

import * as actions from './store/actions'

import styles from './App.module.scss'
import 'animate.css'

class App extends Component {
  componentDidMount() {
    if (Cookies.get('token')) {
      this.props.setAuth(true)
    }
  }
  render() {
    return (
      <div className={styles.App}>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <ProtectedRoute path="/home" component={Home} />
            <Route render={() => <h1>Not found</h1>} />
          </Switch>
        </Router>
      </div>
    )
  }
}

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({
  setAuth: value => dispatch(actions.setAuth(value)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
