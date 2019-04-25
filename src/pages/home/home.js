import { Layout, Form, Icon, Input, Button, Checkbox } from "antd";
import React, { Component } from "react";
import "antd/dist/antd.css";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { connect } from "react-redux";
import Postbox from "../../components/post/postInput";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { redirectToReferrer: true };
  }

  render() {
    return (
      <Layout className="layout">
        <Postbox />
        <Header />
        <Footer />
      </Layout>
    );
  }
}

export default connect(state => ({
  isLoggedIn: state.Auth.idToken !== null
}))(Home);
