import React, { Component } from 'react'
import { view } from 'react-easy-state'
import Spinner from 'react-spinkit'
import state from '../utils/state'
import { container, wrapper, fadeIn, helperText, textCenter } from '../styles/Container.css'

class Container extends Component {
  render () {
    const { children } = this.props
    const { showTimeoutSuggestion, hasBooted } = state
    return (
      <div className={wrapper}>
        {!hasBooted && (
          <div className={textCenter}>
            <Spinner name='folding-cube' color='#222' />
            {showTimeoutSuggestion && (
              <div className={`${helperText} ${fadeIn}`}>
                <p>Hmm... This does not seem right.</p>
                <p>Try refreshing the browser</p>
              </div>
            )}
          </div>
        )}
        {hasBooted && <div className={container}>{children}</div>}
      </div>
    )
  }
}

export default view(Container)
