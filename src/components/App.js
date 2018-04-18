import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { view } from 'react-easy-state'
import Editor from './Editor'
import Container from './Container'
import Genny from './Genny'
import ConfigLoader from './ConfigLoader'

// https://bulma.io/documentation

class App extends Component {
  render () {
    return (
      <Router>
        <div>
          <Route exact path='/form/edit' component={Editor} />
          <Route exact path='*' component={ConfigLoader} />
          <Container>
            <Switch>
              <Route
                exact
                path='/form/new'
                render={() => <div>Allow the user to paste in a config here to generate a new form</div>}
              />
              <Route exact path='/form/*' component={Genny} />
            </Switch>
          </Container>
        </div>
      </Router>
    )
  }
}

export default view(App)
