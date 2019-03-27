import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import { loginRequest } from '../redux/auth/actions'
import { connect } from 'react-redux'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
    this.loginRequest = this.loginRequest.bind(this)
  }

  loginRequest (username, password) {
    this.props.loginRequest(this.state.username, this.state.password)
  }

  render () {
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <AppBar
              title='Login'
            />
            <TextField
              hintText='Enter your Username'
              floatingLabelText='Username'
              onChange={(event, newValue) => this.setState({ username: newValue })}
            />
            <br />
            <TextField
              type='password'
              hintText='Enter your Password'
              floatingLabelText='Password'
              onChange={(event, newValue) => this.setState({ password: newValue })}
            />
            <br />
            <RaisedButton label='Submit' primary={true} style={style} onClick={() => this.loginRequest(this.username, this.password)} />
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}

// dispatch actions
const mapDispatchToProps = (dispatch) => {
  return {
    loginRequest: (username, password) => dispatch(loginRequest(username, password))
  }
}

// dispatch store variables
// const mapStateToProps = () => {
//   return {
//     <hello />
//   }
// }

const style = {
  margin: 15
}

export default connect(null, mapDispatchToProps)(Login)
