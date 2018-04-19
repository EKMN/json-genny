import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { view } from 'react-easy-state'
import state from '../utils/state'

class ConfigLoader extends Component {
  componentDidMount () {
    clearTimeout(window.timeoutSuggestion)
    state.hasBooted = true
    state.currentPath = '/form/default'
    state.showTimeoutSuggestion = false
  }

  render () {
    return <Redirect to='/form/default' />
  }
}

export default view(ConfigLoader)
