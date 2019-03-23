import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { store, history } from './redux/store'
import PublicRoutes from './router'
import logo from './logo.svg'
import './App.css'
import Loginscreen from './containers/loginscreen.js'

// const App = () => {
//   // <Provider store={store}>
//   <Signin />;
//   {
//     /* <PublicRoutes /> */
//   }
//   // </Provider>;
// };

export default class App extends Component {
  render () {
    return (
      // <Provider store={store}>
      //
      // </Provider>
      // <PublicRoutes />
      <Loginscreen />
    )
  }
}
// export default App;
