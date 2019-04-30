import { Layout, Form, Icon, Input, Button, Checkbox } from "antd";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "antd/dist/antd.css";
import "./signin.css";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { connect } from "react-redux";
import { loginRequest } from "../../redux/auth/actions";
import API from "../../api/api";

const { Content } = Layout;

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false,
      signUp: false,
      username: "",
      password: ""
    };
    this.login = this.login.bind(this);
  }

  login(username, password, loginRequest) {
    API.get("/login?username=" + username + "&password=" + password)
      .then(function(response) {
        console.log(response);
        if (response.data.status === "OK") {
          loginRequest(response.data.payload.value, username);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.isLoggedIn !== nextProps.isLoggedIn &&
      nextProps.isLoggedIn === true
    ) {
      this.setState({ redirectToReferrer: true });
    }
  }

  componentDidMount() {
    if (this.props.isLoggedIn === true) {
      this.setState({ redirectToReferrer: true });
    }
  }

  render() {
    const { isLoggedIn } = this.props;
    const { redirectToReferrer, signUp } = this.state;
    const token = 1;
    if (redirectToReferrer) {
      return <Redirect to={{ pathname: "/" }} />;
    }

    if (signUp) {
      return <Redirect to={{ pathname: "/signup" }} />;
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
            onChange={(event, newValue) =>
              this.setState({ username: event.target.value })
            }
            style={{ margin: "24px 0px 0px 0px" }}
          />
          <Input
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            placeholder="Password"
            onChange={(event, newValue) =>
              this.setState({ password: event.target.value })
            }
            style={{ margin: "24px 0px" }}
          />
          <Checkbox>Remember me</Checkbox>
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
          <Button
            type="primary"
            className="login-form-button"
            style={{ margin: "10px 0px 5px 0px" }}
            onClick={() =>
              this.login(
                this.state.username,
                this.state.password,
                this.props.loginRequest
              )
            }
          >
            Log in
          </Button>
          Or
          <a onClick={() => this.setState({ signUp: true })}> register now!</a>
        </Content>
        <Footer />
      </Layout>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginRequest: (token, username) => dispatch(loginRequest(token, username))
  };
};

export default connect(
  state => ({
    isLoggedIn: state.Auth.idToken !== null
  }),
  mapDispatchToProps
)(Signin);
