import React from 'react'
import { view } from 'react-easy-state'
import classNames from 'classnames'
import { progressbar, appear, disappear } from '../styles/Progressbar.css'

const Progressbar = ({ toggled = false, progress = 0 }) => {
  const classes = classNames({
    [progressbar]: true,
    [appear]: toggled,
    [disappear]: !toggled
  })
  return <div className={classes} style={{ width: `${progress}%` }} />
}

export default view(Progressbar)
