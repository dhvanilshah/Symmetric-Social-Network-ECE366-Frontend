import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import Login from '../components/login.js'
import Register from '../components/register.js'
import { connect } from 'react-redux'
import {
  CHECK_AUTHORIZATION,
  LOGIN_REQUEST,
  LOGOUT,
  LOGIN_SUCCESS,
  LOGIN_ERROR
} from '../redux/auth/actiontypes.js'

const style = {
  margin: 15
}

export default class Loginscreen extends Component {
  constructor (props) {
    super(props)
    var loginButtons = []
    loginButtons.push(
      <div>
        <MuiThemeProvider>
          <div>
            <RaisedButton label={'Register'} primary={true} style={style} onClick={(event) => this.handleClick(event, 'register')} />
          </div>
        </MuiThemeProvider>
      </div>
    )
    this.state = {
      username: '',
      password: '',
      loginscreen: [],
      loginButtons: loginButtons,
      registerButtonLabel: 'Register',
      isLogin: true
    }
  }

  componentWillMount () {
    var loginscreen = []
    loginscreen.push(<Login parentContext={this} appContext={this.props.appContext} />)
    this.setState({
      loginscreen: loginscreen
    })
  }

  handleClick (event, userRole) {
    console.log('event', userRole)
    if (this.state.isLogin) {
      let loginscreen = []
      loginscreen.push(<Register parentContext={this} appContext={this.props.appContext} role={userRole} />)
      let loginButtons = []
      loginButtons.push(
        <div key='login-button'>
          <MuiThemeProvider>
            <div>
              <RaisedButton label={'Login'} primary={true} style={style} onClick={(event) => this.handleClick(event, userRole)} />
            </div>
          </MuiThemeProvider>
        </div>
      )
      this.setState({
        loginscreen: loginscreen,
        loginButtons: loginButtons,
        isLogin: false
      })
    } else {
      let loginscreen = []
      let loginButtons = []
      loginButtons.push(
        <div>
          <MuiThemeProvider>
            <div>
              <RaisedButton label={'Register'} primary={true} style={style} onClick={(event) => this.handleClick(event,'register')}/>
            </div>
          </MuiThemeProvider>
        </div>
      )
      loginscreen.push(<Login parentContext={this} appContext={this.props.appContext} role={userRole} />)
      this.setState({
        loginscreen: loginscreen,
        loginButtons: loginButtons,
        isLogin: true
      })
    }
  }

  render () {
    return (
      <div className='loginscreen' key='loginscreen'>
        {this.state.loginscreen}
        <div>
          {this.state.loginButtons}
        </div>
      </div>
    )
  }
}
