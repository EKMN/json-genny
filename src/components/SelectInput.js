import React from 'react'
import { view } from 'react-easy-state'

const SelectInput = ({
  options = [ 'abc', 'def', 'ghi' ],
  label = 'Select with input',
  placeholder = label,
  helpText = '',
  inputName = '',
  inputName2 = inputName
}) => (
  <div className='field'>
    <label className='label'>{label}</label>
    <div className='field has-addons'>
      <p className='control'>
        <span className='select'>
          <select name={inputName}>{options.map((option, index) => <option key={index}>{option}</option>)}</select>
        </span>
      </p>
      <p className='control is-expanded'>
        <input className='input' type='text' placeholder={placeholder} name={inputName2} />
      </p>
    </div>
    {helpText && <p className='help'>{helpText}</p>}
  </div>
)

export default view(SelectInput)
