import React, { Component } from 'react'
import { view } from 'react-easy-state'
import WhenReady from '../components/WhenReady'

class New extends Component {
  render () {
    return (
      <WhenReady>
        <div>
          delete form, create a new form (request path from api) and finally redirect to that path. Verify with user
          first through a form
        </div>
      </WhenReady>
    )
  }
}

export default view(New)
