import React, { Component } from 'react'
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
// import Popup from 'reactjs-popup'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { view } from 'react-easy-state'
// import state from '../utils/state'
import Editor from './Editor'
import Container from './Container'
import Genny from './Genny'

// https://bulma.io/documentation

class App extends Component {
  componentDidMount () {
    // map to request by URL. e.g. /#/12e1e23d23kjlkjf32239f323 make a request to the API with that endpoint,
    // which returns a JSON config, similiar to `example.json`.
    // the API simply maps POSTs into entires, and GET retrieves them. PUT edits them. DELETE removes them.
  }

  render () {
    return (
      <Router>
        <div>
          <Route exact path='/edit' component={Editor} />
          <Container>
            <Switch>
              <Route exact path='/' component={Genny} />
              <Route exact path='/:action' component={Genny} />
              <Route exact path='/:action/:resource' component={Genny} />
            </Switch>
          </Container>
        </div>
      </Router>
    )
  }
}

export default view(App)
