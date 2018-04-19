import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { view } from 'react-easy-state'
import axios from 'axios'
import state from '../utils/state'
import notification from '../utils/notification'
import validate from '../utils/configValidator'
import Popup from './Popup'

const SaveText = ({ onSave, onError, saveText, errorText, saveConfig }) => (
  <span>
    {!onSave && !onError && saveConfig}
    {onSave && saveText}
    {onError && errorText}
  </span>
)

class Editor extends Component {
  state = {
    isLoading: false,
    recentlySaved: false,
    errorOnSave: false
  }

  componentWillUnmount () {
    clearTimeout(this.configTimeout)
    clearTimeout(this.savedTimeout)
    clearTimeout(this.errorTimeout)
  }

  onChange = (event) => {
    state.gennyDraftData = event.target.value
  }

  exitEditor = () => {
    this.props.history.goBack()
  }

  recentlySaved = () => {
    const { gennyDraftData } = state
    const jsonToObject = JSON.parse(gennyDraftData)
    state.gennyData = jsonToObject
    this.setState({
      recentlySaved: true
    })
    this.savedTimeout = setTimeout(() => {
      this.setState({
        recentlySaved: false
      })
    }, 3000)
    notification.success('Saved!')
  }

  recentlyFailed = () => {
    this.setState({
      errorOnSave: true
    })
    this.errorTimeout = setTimeout(() => {
      this.setState({
        errorOnSave: false
      })
    }, 3000)
  }

  onSubmit = () => {
    const { recentlySaved, errorOnSave, isLoading } = this.state
    if (recentlySaved || errorOnSave || isLoading) {
      // do not allow another action until the timeout has cleared
      return false
    }

    // save our local changes to our entire app
    try {
      const { id } = this.props
      const submitUrl = `${process.env.API_LOCATION}/${id}`.split(' ').join('')
      const jsonToObject = JSON.parse(state.gennyDraftData)

      const validation = validate(jsonToObject)

      if (!validation.isValid) {
        const error = new Error('Invalid configuration!')
        error.type = 'invalid'
        error.failed = validation.failed
        throw error
      }

      // set loader
      this.setState({
        isLoading: true
      })

      // post changes to server
      axios
        .post(submitUrl, jsonToObject)
        .then((data) => {
          this.recentlySaved()
        })
        .catch((error) => {
          notification.error(error.message)
          this.recentlyFailed()
        })
        .then(() => {
          this.setState({
            isLoading: false
          })
        })
    } catch (error) {
      if (error.type === 'invalid') {
        notification.error(`${error.message} ${error.failed.map((fail) => `<br />- ${fail}`)}`, 7500)
      } else {
        notification.error('Invalid json, changes not saved!')
      }

      this.recentlyFailed()
    }
  }

  render () {
    const { hasBooted, gennyData, gennyDraftData } = state
    const { formSettings = {} } = gennyData
    const {
      saveSuccess = 'Saved',
      saveFail = 'Save failed',
      exitConfig = 'Exit editor',
      saveConfig = 'Save config'
    } = formSettings
    const { recentlySaved, errorOnSave, isLoading } = this.state
    return (
      hasBooted && (
        <Popup>
          <div className='editor'>
            <div className='field'>
              <label className='label is-large'>Config editor</label>
              <div className='control is-expanded is-fullwidth'>
                <textarea
                  className={`textarea ${errorOnSave && 'is-danger'} ${recentlySaved && 'is-success'} `}
                  placeholder='Textarea'
                  style={{ height: '500px', fontFamily: 'monospace' }}
                  value={gennyDraftData}
                  onChange={this.onChange}
                />
              </div>
            </div>
            <div className='field is-grouped is-grouped-centered'>
              <p className='control' onClick={this.onSubmit}>
                <a
                  className={`button fade-background ${recentlySaved ? 'is-success' : 'is-dark'} ${errorOnSave
                    ? 'is-danger'
                    : 'is-dark'} ${isLoading && 'is-loading'}`}
                >
                  {recentlySaved && (
                    <span className='icon is-small'>
                      <i className='fas fa-check' />
                    </span>
                  )}
                  {errorOnSave && (
                    <span className='icon is-small'>
                      <i className='fas fa-times' />
                    </span>
                  )}
                  <SaveText
                    onSave={recentlySaved}
                    onError={errorOnSave}
                    saveText={saveSuccess}
                    errorText={saveFail}
                    saveConfig={saveConfig}
                  />
                </a>
              </p>
              <p className='control'>
                <a className='button is-light' onClick={this.exitEditor}>
                  {exitConfig}
                </a>
              </p>
            </div>
          </div>
        </Popup>
      )
    )
  }
}

export default withRouter(view(Editor))
