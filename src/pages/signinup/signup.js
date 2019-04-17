import { Layout, Form, Icon, Input, Button, Checkbox } from "antd";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "antd/dist/antd.css";
import "./signup.css";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { connect } from "react-redux";
import { loginRequest } from '../../redux/auth/actions'
const { Content } = Layout;

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = { redirectToReferrer: false };
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.isLoggedIn !== nextProps.isLoggedIn &&
      nextProps.isLoggedIn === true
    ) {
      this.setState({ redirectToReferrer: true });
    }
  }
  render() {
    const { isLoggedIn, loginRequest } = this.props;
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
          />
          <Input
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            placeholder="Password"
            style={{ margin: "24px 0px 0px 0px" }}
          />
          <Input
            type="email"
            placeholder="email"
            style={{ margin: "24px 0px 0px 0px" }}
          />
          <Input
            type="first name"
            placeholder="first name"
            style={{ margin: "24px 0px 0px 0px" }}
          />
          <Input
            type="last name"
            placeholder="last name"
            style={{ margin: "24px 0px 0px 0px" }}
          />
          <Input
            type="service"
            placeholder="music streaming service"
            style={{ margin: "24px 0px" }}
          />
          <Button
            type="primary"
            className="login-form-button"
            style={{ margin: "10px 0px 5px 0px" }}
            // onClick={() => login(token)}
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

export default connect(
  state => ({
    isLoggedIn: state.Auth.idToken !== null
  }),
  { loginRequest }
)(Signup);
