import React from 'react'
import { view } from 'react-easy-state'

const File = ({
  label = 'File input',
  fileLabel = 'Choose a file…',
  filename = '',
  fileIcon = 'far fa-file',
  helpText = ''
}) => (
  <div className='field'>
    <label className='label'>{label}</label>
    <div className='file has-name is-fullwidth'>
      <label className='file-label'>
        <input className='file-input' type='file' name={filename} />
        <span className='file-cta'>
          <span className='file-icon'>
            <i className={fileIcon} />
          </span>
          <span className='file-label'>{fileLabel}</span>
        </span>
        <span className='file-name'>{filename}</span>
      </label>
    </div>
    {helpText && <p className='help'>{helpText}</p>}
  </div>
)

export default view(File)
