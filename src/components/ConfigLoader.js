import React, { Component } from 'react'
import { view } from 'react-easy-state'

import parseURL from '../utils/parseURL'
import { loadConfig, setData } from '../utils/bootup'
import notification from '../utils/notification'
import validator from '../utils/configValidator'
import state from '../utils/state'

class ConfigLoader extends Component {
  componentDidMount () {
    window.validator = validator
    // map to request by URL. e.g. /#/12e1e23d23kjlkjf32239f323 make a request to the API with that endpoint,
    // which returns a JSON config, similiar to `example.json`.
    // the API simply maps POSTs into entires, and GET retrieves them. PUT edits them. DELETE removes them.

    this.loadForm()
    window.timeoutSuggestion = setTimeout(() => {
      state.showTimeoutSuggestion = true
    }, 11000)
  }

  loadForm = async () => {
    const useDefault = (redirect = false) => {
      state.hasBooted = true
      clearTimeout(window.timeoutSuggestion)
      if (redirect) {
        this.props.history.push('/form/default')
      }
    }

    const { match } = this.props
    const matchExists = !!match
    const paramsExists = matchExists && match['params']
    const pathExists =
      matchExists && paramsExists && parseURL(match.params[0])[1] && parseURL(match.params[0])[1].length

    if (pathExists) {
      const path = parseURL(match.params[1])[1]

      // redirect to /form/default is path is default
      if (path === 'default' || path === 'new' || path === 'edit') {
        useDefault()
        return false
      }

      try {
        const config = await loadConfig(`http://localhost:3000/${path}`)
        // validate data here and throw if validation fails
        setData(config.data)
        clearTimeout(window.timeoutSuggestion)
      } catch (error) {
        useDefault(true)
        notification.error(`${error.message}. \n Failed to fetch '${path}'`, 2000)
      }
    } else {
      // use default
      useDefault(true)
    }
  }

  render () {
    return <div />
  }
}

export default view(ConfigLoader)
