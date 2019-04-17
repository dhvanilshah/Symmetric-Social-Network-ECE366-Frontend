import { Layout, Form, Icon, Input, Button, Checkbox } from "antd";
import React, { Component } from "react";
import "antd/dist/antd.css";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { connect } from "react-redux";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { redirectToReferrer: true };
    // console.log(this.props.isLoggedIn)
  }

  render() {
    return (
      <Layout className="layout">
        <Header />
        <Footer />
      </Layout>
    );
  }
}

export default connect(state => ({
  isLoggedIn: state.Auth.idToken !== null
}))(Home);
