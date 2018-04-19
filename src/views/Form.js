import React, { Component } from 'react'
import { view } from 'react-easy-state'
import WhenReady from '../components/WhenReady'
import Genny from '../components/Genny'

class Form extends Component {
  render () {
    return (
      <WhenReady>
        <Genny />
      </WhenReady>
    )
  }
}

export default view(Form)
