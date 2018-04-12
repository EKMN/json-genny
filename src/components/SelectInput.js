import React from 'react'
import { view } from 'react-easy-state'

const SelectInput = ({
  options = [ 'abc', 'def', 'ghi' ],
  label = 'Select with input',
  placeholder = label,
  helpText = ''
}) => (
  <div className='field'>
    <label className='label'>{label}</label>
    <div className='field has-addons'>
      <p className='control'>
        <span className='select'>
          <select>{options.map((option, index) => <option key={index}>{option}</option>)}</select>
        </span>
      </p>
      <p className='control is-expanded'>
        <input className='input' type='text' placeholder={placeholder} />
      </p>
    </div>
    {helpText && <p className='help'>{helpText}</p>}
  </div>
)

export default view(SelectInput)
