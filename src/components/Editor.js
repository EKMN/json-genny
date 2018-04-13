import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { view } from 'react-easy-state'
import state from '../utils/state'
import notification from '../utils/notification'

class Editor extends Component {
  state = {
    localConfig: JSON.stringify(state.gennyData, null, 2) || '',
    recentlySaved: false,
    errorOnSave: false
  }

  componentWillUnmount () {
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
      console.log('I am hit')
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
    const { recentlySaved, errorOnSave } = this.state
    return (
      <div
        style={{
          maxWidth: '800px',
          width: 'calc(100vw - 120px)'
        }}
      >
        <div className='field'>
          <label className='label'>Config editor</label>
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
    )
  }
}

export default view(Editor)
