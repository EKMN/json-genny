import React, { Component } from 'react'
import { view } from 'react-easy-state'
import WhenReady from '../components/WhenReady'

class New extends Component {
  render () {
    return (
      <WhenReady>
        <div>Allow the user to paste in a config here to generate a new form</div>
      </WhenReady>
    )
  }
}

export default view(New)
