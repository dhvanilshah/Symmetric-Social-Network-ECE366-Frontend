import { Layout, Form, Icon, Input, Button, Checkbox } from "antd";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "antd/dist/antd.css";
import "./signup.css";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { connect } from "react-redux";
import { registerUser } from "../../redux/auth/actions";
import API from "../../api/api";
import { red } from "ansi-colors";

const { Content } = Layout;

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false,
      goBack: false,
      fullName: "",
      email: "",
      username: "",
      password: "",
      birthday: ""
    };
    this.register = this.register.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.isLoggedIn !== nextProps.isLoggedIn &&
      nextProps.isLoggedIn === true
    ) {
      this.setState({ redirectToReferrer: true });
    }
  }

  register(fullName, email, username, password, birthday, registerUser) {
    let verify = false;

    const user = {
      name: fullName,
      email: email,
      password: password,
      username: username,
      birthday: birthday
    };
    const redirect = fetch("http://localhost:8000/api/addUser", {
      method: "post",
      body: JSON.stringify(user)
    })
      .then(function(response) {
        console.log("success", response);
        return true;
      })
      .catch(function(error) {
        console.log("error", error);
      });

    if (redirect) {
      this.setState({ redirectToReferrer: true });
    }
  }

  render() {
    const { isLoggedIn } = this.props;
    const { redirectToReferrer } = this.state;
    const { goBack } = this.state;
    const token = 1;
    if (redirectToReferrer) {
      return <Redirect to={{ pathname: "/" }} />;
    }
    if (goBack) {
      return <Redirect to={{ pathname: "/" }} />;
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
            onChange={(event, newValue) =>
              this.setState({ username: event.target.value })
            }
          />
          <Input
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            placeholder="Password"
            style={{ margin: "24px 0px 0px 0px" }}
            onChange={(event, newValue) =>
              this.setState({ password: event.target.value })
            }
          />
          <Input
            type="email"
            placeholder="email"
            style={{ margin: "24px 0px 0px 0px" }}
            onChange={(event, newValue) =>
              this.setState({ email: event.target.value })
            }
          />
          <Input
            type="full name"
            placeholder="full name"
            style={{ margin: "24px 0px 0px 0px" }}
            onChange={(event, newValue) =>
              this.setState({ fullName: event.target.value })
            }
          />
          <Input
            type="birthday"
            placeholder="birthday"
            style={{ margin: "24px 0px" }}
            onChange={(event, newValue) =>
              this.setState({ birthday: event.target.value })
            }
          />
          <Button
            type="primary"
            className="login-form-button"
            style={{ margin: "10px 0px 5px 0px" }}
            onClick={() =>
              this.register(
                this.state.fullName,
                this.state.email,
                this.state.username,
                this.state.password,
                this.state.birthday,
                this.props.registerUser
              )
            }
          >
            Sign Up
          </Button>
          Or <a onClick={() => this.setState({ goBack: true })}>sign in.</a>
        </Content>
        <Footer />
      </Layout>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    registerUser: receipt => dispatch(registerUser(receipt))
  };
};

export default connect(
  state => ({
    isLoggedIn: state.Auth.idToken !== null
  }),
  mapDispatchToProps
)(Signup);
