import React from 'react'
import { view } from 'react-easy-state'

const Select = ({
  options = [ '123', '345', '678' ],
  label = 'Select',
  icon = 'fas fa-globe',
  helpText = '',
  inputName = '',
  required = false
}) => (
  <div className='field'>
    <label className='label'>{label}</label>
    <div className='field'>
      <div className='control has-icons-left'>
        <div className='select is-fullwidth'>
          <select required={required} name={inputName}>
            {options.map((option, index) => <option key={index}>{option}</option>)}
          </select>
        </div>
        <div className='icon is-small is-left'>
          <i className={icon} />
        </div>
      </div>
    </div>
    {helpText && <p className='help'>{helpText}</p>}
  </div>
)

export default view(Select)
