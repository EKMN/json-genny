import React, { Component } from 'react'
import { view } from 'react-easy-state'

class Popup extends Component {
  componentDidMount () {
    document.body.classList.add('noscroll')
  }
  componentWillUnmount () {
    document.body.classList.remove('noscroll')
  }
  render () {
    const { children, style } = this.props
    return (
      <div className='popup' style={style}>
        {children}
      </div>
    )
  }
}

export default view(Popup)
