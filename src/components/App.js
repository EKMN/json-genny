import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { view } from 'react-easy-state'
import Container from './Container'
import ConfigLoader from './ConfigLoader'
import GotoDefault from './GotoDefault'

import Delete from '../views/Delete'
import Edit from '../views/Edit'
import Form from '../views/Form'
import New from '../views/New'

// https://bulma.io/documentation

class App extends Component {
  render () {
    return (
      <Router>
        <div>
          <Route exact path='/form/:id' component={ConfigLoader} />
          <Route exact path='/form/:id/*' component={ConfigLoader} />
          <Route exact path='/form/:id/edit' component={Edit} />
          <Route exact path='/form/:id/delete' component={Delete} />
          <Container>
            <Switch>
              <Route exact path='/form/:id' component={Form} />
              <Route exact path='/form/:id/new' component={New} />
              <Route exact path='/form/:id/edit' component={Form} />
              <Route exact path='/form/:id/delete' component={Form} />
              <Route component={GotoDefault} />
            </Switch>
          </Container>
        </div>
      </Router>
    )
  }
}

export default view(App)
