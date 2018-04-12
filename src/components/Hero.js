import React from 'react'
import { view } from 'react-easy-state'
import Controls from './Controls'

const Hero = ({ title = '', subtitle = '', version = '1.0.0' }) => (
  <section className='hero'>
    <div className='hero-body'>
      <h1 className='title'>{title}</h1>
      <h2 className='subtitle'>{subtitle}</h2>
      <Controls />
    </div>
  </section>
)

export default view(Hero)
