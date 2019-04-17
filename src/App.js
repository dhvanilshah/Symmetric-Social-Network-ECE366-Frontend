import React, { Component } from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import PublicRoutes from "./router";
import "./App.css";
import Startup from "./startup";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Startup>
          <PublicRoutes />
        </Startup>
      </Provider>
    )
  }
}
export default App
