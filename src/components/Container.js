import React from 'react'
import { view } from 'react-easy-state'
import state from '../utils/state'

import Spinner from 'react-spinkit'
import { container, wrapper } from '../styles/Container.css'

const Container = ({ children }) => (
  <div className={wrapper}>
    {!state.hasBooted && <Spinner name='folding-cube' color='#222' />}
    {state.hasBooted && <div className={container}>{children}</div>}
  </div>
)

export default view(Container)
