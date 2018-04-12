import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './components/App'
import bootup from './utils/bootup'
// import 'roboto-fontface'
import 'bulma'
import './styles/variables.css'
import 'noty/lib/noty.css'
import './index.css'

// loads initial data
bootup()

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('app')
)
