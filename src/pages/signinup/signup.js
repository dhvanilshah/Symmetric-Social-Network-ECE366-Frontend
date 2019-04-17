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
      fullName: '',
      email: '',
      username: '',
      password: '',
      service: ''
    }
    this.registerUser = this.registerUser.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.isLoggedIn !== nextProps.isLoggedIn &&
      nextProps.isLoggedIn === true
    ) {
      this.setState({ redirectToReferrer: true });
    }
  }

  registerUser (fullName, email, username, password, service) {
    console.log('yoooo')
    API.get('/addUser?username='+{username}+'&password='+{password}+'&email='+{email}+'&fullName='+{fullName}+'&service='+(service))
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    const { isLoggedIn, registerUser } = this.props;
    const { redirectToReferrer } = this.state;
    const token = 1;
    if (redirectToReferrer) {
      return <Redirect to={{ pathname: "/home" }} />;
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
            onChange={(event, newValue) => this.setState({ username: newValue })}
          />
          <Input
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            placeholder="Password"
            style={{ margin: "24px 0px 0px 0px" }}
            onChange={(event, newValue) => this.setState({ password: newValue })}
          />
          <Input
            type="email"
            placeholder="email"
            style={{ margin: "24px 0px 0px 0px" }}
            onChange={(event, newValue) => this.setState({ email: newValue })}
          />
          <Input
            type="full name"
            placeholder="full name"
            style={{ margin: "24px 0px 0px 0px" }}
            onChange={(event, newValue) => this.setState({ fullName: newValue })}
          />
          <Input
            type="service"
            placeholder="music streaming service"
            style={{ margin: "24px 0px" }}
            onChange={(event, newValue) => this.setState({ service: newValue })}
          />
          <Button
            type="primary"
            className="login-form-button"
            style={{ margin: "10px 0px 5px 0px" }}
            onClick={() => this.registerUser(this.fullName, this.email, this.username, this.password, this.service)}
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
    registerUser: (fullName, email, username, password, service) => dispatch(registerUser(fullName, email, username, password, service))
  }
}

export default connect(
  state => ({
    isLoggedIn: state.Auth.idToken !== null
  }),
  mapDispatchToProps
)(Signup);
