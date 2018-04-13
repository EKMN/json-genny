import React, { Component } from 'react'
import { view } from 'react-easy-state'

class File extends Component {
  state = {
    fileName: ''
  }

  onChange = (e) => {
    const { target } = e

    if (target.files.length) {
      const { files } = target
      this.setState({
        fileName: files[0].name
      })
    }
  }

  render () {
    const {
      label = 'File input',
      fileLabel = 'Select a file',
      fileName = ' No file selected...',
      fileIcon = 'far fa-file',
      helpText = ''
    } = this.props
    const localFileName = this.state.fileName || fileName

    return (
      <div className='field'>
        <label className='label'>{label}</label>
        <div className='file has-name is-fullwidth'>
          <label className='file-label'>
            <input className='file-input' type='file' name={localFileName} onChange={this.onChange} />
            <span className='file-cta'>
              <span className='file-icon'>
                <i className={fileIcon} />
              </span>
              <span className='file-label'>{fileLabel}</span>
            </span>
            <span className='file-name'>{localFileName}</span>
          </label>
        </div>
        {helpText && <p className='help'>{helpText}</p>}
      </div>
    )
  }
}

export default view(File)
