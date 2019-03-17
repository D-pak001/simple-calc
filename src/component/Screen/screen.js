import React, { Component } from 'react'
class ShowResult extends Component {
  render() {
    const string = this.props.data.join('')
    return <div className= "screen"> {string} </div>
  }
}
export default ShowResult;