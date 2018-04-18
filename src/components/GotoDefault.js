import React, { Component } from 'react'
import { view } from 'react-easy-state'
import state from '../utils/state'

class ConfigLoader extends Component {
  componentDidMount () {
    state.hasBooted = true
    clearTimeout(window.timeoutSuggestion)
    this.props.history.push('/form/default')
  }
}

export default view(ConfigLoader)
