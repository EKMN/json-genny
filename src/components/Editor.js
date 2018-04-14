import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { view } from 'react-easy-state'
import state from '../utils/state'
import notification from '../utils/notification'
import Popup from './Popup'

class Editor extends Component {
  state = {
    localConfig: '',
    recentlySaved: false,
    errorOnSave: false
  }

  // this will update the localConfig when we actually have booted
  checkForConfig = () => {
    const { hasBooted, gennyData } = state
    if (hasBooted) {
      this.setState({
        localConfig: JSON.stringify(gennyData, null, 2)
      })
    } else {
      this.configTimeout = setTimeout(() => {
        console.log('I am running')
        this.checkForConfig()
      }, 250)
    }
  }

  componentDidMount () {
    this.checkForConfig()
  }

  componentWillUnmount () {
    clearTimeout(this.configTimeout)
    clearTimeout(this.savedTimeout)
    clearTimeout(this.errorTimeout)
  }

  onChange = (event) => {
    this.setState({
      localConfig: event.target.value
    })
  }

  onSubmit = () => {
    const { recentlySaved, errorOnSave } = this.state
    if (recentlySaved || errorOnSave) {
      // do not allow another action until the timeout has cleared
      return false
    }

    // save our local changes to our entire app
    try {
      const jsonToObject = JSON.parse(this.state.localConfig)
      state.gennyData = jsonToObject
      this.setState({
        recentlySaved: true
      })
      this.savedTimeout = setTimeout(() => {
        this.setState({
          recentlySaved: false
        })
      }, 3000)
    } catch (e) {
      notification.error('Invalid json, changes not saved!')
      this.setState({
        errorOnSave: true
      })
      this.errorTimeout = setTimeout(() => {
        this.setState({
          errorOnSave: false
        })
      }, 3000)
    }
  }

  render () {
    const { hasBooted } = state
    const { recentlySaved, errorOnSave } = this.state
    return hasBooted ? (
      <Popup>
        <div className='editor'>
          <div className='field'>
            <label className='label is-large'>Config editor</label>
            <div className='control is-expanded is-fullwidth'>
              <textarea
                className={`textarea ${errorOnSave && 'is-danger'} ${recentlySaved && 'is-success'} `}
                placeholder='Textarea'
                style={{ height: '500px', fontFamily: 'monospace' }}
                value={this.state.localConfig}
                onChange={this.onChange}
              />
            </div>
          </div>
          <div className='field is-grouped is-grouped-centered'>
            <p className='control' onClick={this.onSubmit}>
              <a
                className={`button fade-background ${recentlySaved ? 'is-success' : 'is-dark'} ${errorOnSave
                  ? 'is-danger'
                  : 'is-dark'}`}
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
                <span>Save config</span>
              </a>
            </p>
            <p className='control'>
              <Link to='/' className='button is-light'>
                Exit editor
              </Link>
            </p>
          </div>
        </div>
      </Popup>
    ) : (
      <Redirect to='/' />
    )
  }
}

export default view(Editor)
