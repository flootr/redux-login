import React, { Component } from 'react'
import { bool, func } from 'prop-types'
import { connect } from 'react-redux'
import Auth0Lock from 'auth0-lock'
import Button from './button'
import { login, logout } from '../store/user'

const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID
const domain = process.env.REACT_APP_AUTH0_DOMAIN

class App extends Component {
  constructor (props) {
    super(props)

    this._lock = new Auth0Lock(clientId, domain)
  }

  componentDidMount () {
    this._lock.on('authenticated', authResult => {
      this.props.login({
        idToken: authResult.idToken,
        accessToken: authResult.accessToken
      })
    })
  }

  showLogin = () => this._lock.show()

  render () {
    const loggedIn = this.props.loggedIn

    return (
      <div>
        <div className='measure center ph2'>
          <h1>Welcome!</h1>
          <p>You're {!loggedIn && 'not'} logged in.</p>
          <Button
            type='button'
            onClick={loggedIn ? this.props.logout : this.showLogin}
          >
            {loggedIn ? 'Sign out' : 'Sign in'}
          </Button>
        </div>
      </div>
    )
  }
}

App.propTypes = {
  loggedIn: bool.isRequired,
  login: func.isRequired,
  logout: func.isRequired
}

const mapState = state => ({
  loggedIn: state.user.loggedIn
})

const mapDispatch = {
  login,
  logout
}

export default connect(mapState, mapDispatch)(App)
