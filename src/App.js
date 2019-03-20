import React, { Component } from "react";
import { Provider } from "react-redux";
import { store, history } from "./redux/store";
import PublicRoutes from "./router";
import logo from "./logo.svg";
import "./App.css";
import Signin from "./pages/signin/signin";

// const App = () => {
//   // <Provider store={store}>
//   <Signin />;
//   {
//     /* <PublicRoutes /> */
//   }
//   // </Provider>;
// };

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PublicRoutes />
      </Provider>
    );
  }
}
export default App;
