import React, { Component } from 'react'
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { view } from 'react-easy-state'
import state from '../utils/state'

import Container from './Container'
import Genny from './Genny'

// https://bulma.io/documentation

class App extends Component {
  toggleLoading = () => {
    state.isLoading = !state.isLoading
  }

  componentDidMount () {
    // map to request by URL. e.g. /#/12e1e23d23kjlkjf32239f323 make a request to the API with that endpoint,
    // which returns a JSON config, similiar to `example.json`.
    // the API simply maps POSTs into entires, and GET retrieves them. PUT edits them. DELETE removes them.
  }

  render () {
    return (
      <Container>
        <Route path='*/:action' component={Genny} />
        <Route path='*/:action/:resource' component={Genny} />
      </Container>
    )
  }
}

export default view(App)
