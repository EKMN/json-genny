import React from 'react'
import { view } from 'react-easy-state'
import state from '../utils/state'
import classNames from 'classnames'
import { formButtons } from '../styles/FormButtons.css'

const FormButtons = ({ resetForm }) => {
  const { formSettings } = state.gennyData
  const { submitName = 'Submit', resetName = 'Reset', saveSuccess = 'Saved', saveFail = 'Save failed' } = formSettings

  const saveButton = classNames({
    button: true,
    'is-dark': true,
    'is-loading': state.gennySubmitting,
    'is-success': state.gennySubmitStatus === 'success',
    'is-danger': state.gennySubmitStatus === 'error'
  })

  const resetSubmit = (timeout = 3000) => {
    setTimeout(() => {
      state.gennySubmitStatus = null
    }, timeout)
  }

  const saveMessage = () => {
    switch (state.gennySubmitStatus) {
      case null:
        return submitName
      case 'success':
        resetSubmit()
        return saveSuccess
      case 'error':
        resetSubmit()
        return saveFail
    }
  }
  return (
    <div className={`field is-grouped is-grouped-centered ${formButtons}`}>
      <p className='control'>
        <button className='transparent'>
          <a className={saveButton}>
            {state.gennySubmitStatus === 'success' && (
              <span className='icon is-small'>
                <i className='fas fa-check' />
              </span>
            )}
            {state.gennySubmitStatus === 'error' && (
              <span className='icon is-small'>
                <i className='fas fa-times' />
              </span>
            )}
            <span>{saveMessage()}</span>
          </a>
        </button>
      </p>
      <p className='control'>
        <input className='button' type='reset' value={resetName} onClick={resetForm} disabled={state.gennySubmitting} />
      </p>
    </div>
  )
}

export default view(FormButtons)
