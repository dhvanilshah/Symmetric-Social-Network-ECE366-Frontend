import { Layout, Form, Icon, Input, Button, Checkbox } from "antd";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "antd/dist/antd.css";
import "./signup.css";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { connect } from "react-redux";
import { registerUser } from '../../redux/auth/actions'
import API from '../../api/api'

const { Content } = Layout;

class Signup extends Component {
  constructor (props) {
    super(props)
    this.state = { redirectToReferrer: false,
      registerSuccess: false,
      fullName: '',
      email: '',
      username: '',
      password: '',
      service: ''
    }
    this.register = this.register.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.isLoggedIn !== nextProps.isLoggedIn &&
      nextProps.isLoggedIn === true
    ) {
      this.setState({ redirectToReferrer: true });
    }
  }

  register (fullName, email, username, password, service, registerUser) {
    API.post('/addUser', {
      name: fullName,
      email: email,
      password: password,
      username: username,
      service: service
    })
      .then(function (response) {
        this.setState({ registerSuccess: true })
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  render () {
    const { isLoggedIn } = this.props
    const { redirectToReferrer } = this.state
    const { registerSuccess } = this.state
    const token = 1;
    if (redirectToReferrer) {
      return <Redirect to={{ pathname: "/home" }} />
    }
    if (registerSuccess) {
      return <Redirect to={{ pathname: "/" }} />
    }
    return (
      <Layout className="layout">
        <Header />
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: "#fff",
            minHeight: "80vh",
            alignSelf: "center",
            justifyItems: "space-between"
          }}
          className="login-form"
        >
          <h1 style={{ margin: "24px 0px 0px 0px", textAlign: "center" }}>
            DISC
          </h1>
          <Input
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Username"
            style={{ margin: "24px 0px 0px 0px" }}
            onChange={(event, newValue) => this.setState({ username: event.target.value })}
          />
          <Input
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            placeholder="Password"
            style={{ margin: "24px 0px 0px 0px" }}
            onChange={(event, newValue) => this.setState({ password: event.target.value })}
          />
          <Input
            type="email"
            placeholder="email"
            style={{ margin: "24px 0px 0px 0px" }}
            onChange={(event, newValue) => this.setState({ email: event.target.value })}
          />
          <Input
            type="full name"
            placeholder="full name"
            style={{ margin: "24px 0px 0px 0px" }}
            onChange={(event, newValue) => this.setState({ fullName: event.target.value })}
          />
          <Input
            type="service"
            placeholder="music streaming service"
            style={{ margin: "24px 0px" }}
            onChange={(event, newValue) => this.setState({ service: event.target.value })}
          />
          <Button
            type="primary"
            className="login-form-button"
            style={{ margin: "10px 0px 5px 0px" }}
            onClick={() => this.register(this.fullName, this.email, this.username, this.password, this.service, this.props.registerUser)}
          >
            Sign Up
          </Button>
          Or <a href="/">sign in.</a>
        </Content>
        <Footer />
      </Layout>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    registerUser: (receipt) => dispatch(registerUser(receipt))
  }
}

export default connect(
  state => ({
    isLoggedIn: state.Auth.idToken !== null
  }),
  mapDispatchToProps
)(Signup);
