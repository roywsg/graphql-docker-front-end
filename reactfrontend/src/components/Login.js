import Cookies from 'js-cookie'
import React, {Component} from 'react'
import {connect} from 'react-redux'

import * as actions from '../store/actions/index'

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      authErr: false,
      form: {
        email: '',
        password: '',
      },
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onFormChange = this.onFormChange.bind(this)
    this.onFocus = this.onFocus.bind(this)
  }

  onFocus() {
    this.setState({authErr: false})
  }

  onFormChange(e) {
    const target = e.target
    const name = target.name
    this.setState(prevState => ({
      ...prevState,
      form: {
        ...prevState.form,
        [name]: target.value,
      },
    }))
  }

  onSubmit(e) {
    e.preventDefault()
    if (this.state.form.email !== '' && this.state.form.password !== '') {
      this.props.auth(this.state.form).then(token => {
        if (token) {
          Cookies.set('token', token, {expires: 1})
          this.props.setAuth(true)
          this.props.history.push('/home')
        } else {
          this.setState({authErr: true})
        }
      })
    }
  }

  render() {
    return (
      <div id="login">
        <div className="container">
          <h1>Login</h1>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email: </label>
              <input
                type="text"
                id="email"
                className="form-control"
                name="email"
                onChange={this.onFormChange}
                onFocus={this.onFocus}
                value={this.state.form.email}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password: </label>
              <input
                type="password"
                id="password"
                className="form-control"
                name="password"
                onChange={this.onFormChange}
                onFocus={this.onFocus}
                value={this.state.form.password}
              />
            </div>

            <div className="form-group">
              <input type="submit" value="Submit" className="btn btn-primary" />
            </div>

            {this.props.auth && this.state.authErr && <div className="alert alert-danger">Incorrect login</div>}
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
})

const mapDispatchToProps = dispatch => {
  return {
    auth: form => dispatch(actions.auth(form)),
    setAuth: value => dispatch(actions.setAuth(value)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login)
