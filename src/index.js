import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import bootup from './utils/bootup'
// import 'roboto-fontface'
import 'bulma'
import './styles/variables.css'
import 'noty/lib/noty.css'
import './index.css'

// loads initial data
bootup()

ReactDOM.render(<App />, document.getElementById('app'))
