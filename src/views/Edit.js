import React, { Component } from 'react'
import { view } from 'react-easy-state'
import WhenReady from '../components/WhenReady'
import Editor from '../components/Editor'

class Edit extends Component {
  render () {
    const { id = 'default' } = this.props.match.params
    return (
      <WhenReady>
        <Editor id={id} />
      </WhenReady>
    )
  }
}

export default view(Edit)
