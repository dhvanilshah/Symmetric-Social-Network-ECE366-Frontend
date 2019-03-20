import { Layout } from "antd";
import React, { Component } from "react";

const { Footer } = Layout;
class FooterBar extends Component {
  render() {
    return (
      <Footer style={{ textAlign: "center" }}>
        Disc ©2019 Created by disc.cool
      </Footer>
    );
  }
}

export default FooterBar;
