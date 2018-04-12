import React from 'react'
import { view } from 'react-easy-state'

const Textarea = ({ label = 'Textarea', placeholder = label, helpText = '' }) => (
  <div className='field'>
    <label className='label'>{label}</label>
    <div className='control'>
      <textarea className='textarea' type='text' placeholder={placeholder} />
    </div>
    {helpText && <p className='help'>{helpText}</p>}
  </div>
)

export default view(Textarea)
