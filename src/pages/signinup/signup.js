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
      birthday: "",
      errorVisible: false,
      error: ""
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

  async register(fullName, email, username, password, birthday, registerUser) {
    this.setState({ errorVisible: false });
    const data = await API.post("/addUser", {
      name: fullName,
      email: email,
      password: password,
      username: username,
      birthday: birthday
    })
      .then(function(response) {
        return response.data;
      })
      .catch(function(error) {
        alert(error);
      });
    if (data != null) {
      if (data.status == "UNAUTHORIZED") {
        this.setState({ errorVisible: true, error: data.payload.value });
      } else {
        this.setState({ redirectToReferrer: true });
      }
    }
  }

  render() {
    const { isLoggedIn } = this.props;
    const { redirectToReferrer, errorVisible, error } = this.state;
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
          {errorVisible ? <p>{error}</p> : null}
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
