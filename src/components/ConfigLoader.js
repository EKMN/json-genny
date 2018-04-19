import { Component } from 'react'
import { view } from 'react-easy-state'

import { loadConfig, setData } from '../utils/bootup'
import notification from '../utils/notification'
import validate from '../utils/configValidator'
import state from '../utils/state'

class ConfigLoader extends Component {
  componentDidMount () {
    window.validate = validate
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
      clearTimeout(window.timeoutSuggestion)
      state.hasBooted = true
      state.currentPath = '/form/default'
      state.showTimeoutSuggestion = false
      if (redirect) {
        this.props.history.push('/form/default')
      }
    }

    const { id: path } = this.props.match.params

    // the path is default, ignore request and go straight to view
    if (path === 'default') {
      useDefault()
      return false
    }

    try {
      const location = `${process.env.API_LOCATION}/${path}`.split(' ').join('')
      const { data } = await loadConfig(location)
      const validation = validate(data)
      if (validation.isValid) {
        setData(data)
        state.gennyDraftData = JSON.stringify(data, null, 2)
        state.currentPath = `/form/${path}`
      } else {
        notification.error(`Validation failed. ${validation.failed.map((fail) => `<br />${fail}`)}`, 7500)
        useDefault(true)
      }

      clearTimeout(window.timeoutSuggestion)
    } catch (error) {
      notification.error(`${error.message}. \n Failed to load '/form/${path}'`, 2000)
      useDefault(true)
    }
  }

  render () {
    return null
  }
}

export default view(ConfigLoader)
