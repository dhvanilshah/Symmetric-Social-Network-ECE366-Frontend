import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import { registerUser } from '../redux/auth/actions'
import { connect } from 'react-redux'

class Register extends Component {
  constructor (props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      service: ''
    }
    // this.registerUser = this.registerUser.bind(this)
  }

  registerUser (firstName, lastName, email, username, password, service) {
    this.props.registerUser(this.state.firstName, this.state.lastName, this.state.email, this.state.username, this.state.password, this.state.service)
  }

  render () {
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <AppBar
              title='Register'
            />
            <TextField
              hintText='Enter your First Name'
              floatingLabelText='First Name'
              onChange={(event, newValue) => this.setState({ firstName: newValue })}
            />
            <br />
            <TextField
              hintText='Enter your Last Name'
              floatingLabelText='Last Name'
              onChange={(event, newValue) => this.setState({ lastName: newValue })}
            />
            <br />
            <TextField
              hintText='Enter your Email'
              type='email'
              floatingLabelText='Email'
              onChange={(event, newValue) => this.setState({ email: newValue })}
            />
            <br />
            <TextField
              type='password'
              hintText='Enter your Password'
              floatingLabelText='Password'
              onChange={(event, newValue) => this.setState({ password: newValue })}
            />
            <br />
            <TextField
              type='service'
              hintText='Enter the streaming service you use'
              floatingLabelText='Service'
              onChange={(event, newValue) => this.setState({ service: newValue })}
            />
            <br />
            <RaisedButton label='Submit' primary={true} style={style} onClick={() => this.registerUser(this.firstName, this.lastName, this.email, this.username, this.password, this.service)} />
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}

// dispatch actions
const mapDispatchToProps = (dispatch) => {
  return {
    registerUser: (firstName, lastName, email, username, password, service) => dispatch(registerUser(firstName, lastName, email, username, password, service))
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

export default connect(null, mapDispatchToProps)(Register)
