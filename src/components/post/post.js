// import React, { Component } from 'react'
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
// import AppBar from 'material-ui/AppBar'
// import RaisedButton from 'material-ui/RaisedButton'
// import TextField from 'material-ui/TextField'
// const { Input } = antd
// const { TextArea } = Input
//
// class postBox extends Component {
//   constructor (props) {
//     super(props)
//     this.state = {
//       message: '',
//       song: '',
//       receiverId: '',
//       userId: '',
//       privacy: ''
//     }
//     this.submitPost = this.submitPost.bind(this)
//   }
//
//   submitPost (message, song, receiverId, userId) {
//     this.props.submitPost(this.props.message, this.props.song, this.props.receiverId, this.props.userId)
//   }
//
//   render () {
//     return (
//       <TextArea rows={4} />, mountNode
//     )
//   }
// }
//
// // dispatch actions
// const mapDispatchToProps = (dispatch) => {
//   return {
//     submitPost: (message, song, receiverId, userId) => dispatch(submitPost(message, song, receiverId, userId))
//   }
// }
//
// const style = {
//   margin: 15
// }
//
// export default connect(null, mapDispatchToProps)(postBox)
