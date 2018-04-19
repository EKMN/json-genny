import React from 'react'
import { view } from 'react-easy-state'

const Textarea = ({ label = 'Textarea', placeholder = label, helpText = '', inputName = '', required = false }) => (
  <div className='field'>
    <label className='label'>{label}</label>
    <div className='control'>
      <textarea className='textarea' type='text' placeholder={placeholder} name={inputName} required={required} />
    </div>
    {helpText && <p className='help'>{helpText}</p>}
  </div>
)

export default view(Textarea)
