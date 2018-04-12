import React from 'react'
import { view } from 'react-easy-state'

const Input = ({ type = 'text', label = 'Text input', placeholder = label, helpText = '' }) => (
  <div className='field'>
    <label className='label'>{label}</label>
    <input className='input' type={type} placeholder={placeholder} />
    {helpText && <p className='help'>{helpText}</p>}
  </div>
)

export default view(Input)
