import React, { Component } from 'react'
import { view } from 'react-easy-state'
import state from '../utils/state'

import { formEntry } from '../styles/Genny.css'
import FormButtons from './FormButtons'
import Input from './Input'
import Hero from './Hero'
import File from './File'
import Select from './Select'
import SelectInput from './SelectInput'
import Textarea from './Textarea'
import Progressbar from './Progressbar'

import notification from '../utils/notification'
import { sendAsJson, sendAsForm } from '../utils/send'

class Genny extends Component {
  componentWillUnmount () {
    // reset state and clear any timeouts
    state.gennySubmitStatus = null
    state.gennySubmitting = false
    clearTimeout(this.submitTimeout)
  }

  componentDidMount () {
    // do something here
  }

  submitData = (event) => {
    event.preventDefault()

    // exit if genny is submitting
    if (state.gennySubmitting) {
      return false
    }

    // reset submit state
    state.gennySubmitStatus = null
    state.gennySubmitting = true

    // get translations
    const { formSettings } = state.gennyData
    const { saveSuccess = 'Saved', saveFail = 'Save failed' } = formSettings

    const { exports } = state.gennyData
    const { as, to, using } = exports

    switch (as) {
      case 'json':
        // submit as json
        sendAsJson(event, to, using)
          .then((res) => {
            notification.success(saveSuccess)

            state.gennySubmitting = false
            state.gennySubmitStatus = 'success'
          })
          .catch((err) => {
            window.debug && console.log(err)
            notification.error(saveFail)

            state.gennySubmitting = false
            state.gennySubmitStatus = 'error'
          })
        break
      case 'form':
        // submit using FormData
        sendAsForm(event, to, using)
        break
    }
  }

  resetForm = (event) => {
    state.gennySubmitStatus = null
    state.gennySubmitting = false
  }

  render () {
    const { gennyUploadProgress, gennySubmitting } = state
    const { title, subtitle, inputs, version } = state.gennyData
    const outputExperimental = inputs.map((input, index) => {
      const { type } = input
      const { name, inputName, inputName2, fileName, fileLabel, fileIcon, helpText, options, icon, placeholder } = input
      switch (type) {
        case 'file':
          return (
            <File
              label={name}
              fileName={fileName}
              fileLabel={fileLabel}
              fileIcon={fileIcon}
              helpText={helpText}
              key={index}
            />
          )
        case 'select':
          return (
            <Select inputName={inputName} options={options} label={name} icon={icon} helpText={helpText} key={index} />
          )
        case 'select-input':
          return (
            <SelectInput
              inputName={inputName}
              inputName2={inputName2}
              options={options}
              label={name}
              placeholder={placeholder}
              helpText={helpText}
              key={index}
            />
          )
        case 'textarea':
          return (
            <Textarea inputName={inputName} label={name} placeholder={placeholder} helpText={helpText} key={index} />
          )
        case 'input__text':
          return (
            <Input
              inputName={inputName}
              type='text'
              label={name}
              placeholder={placeholder}
              helpText={helpText}
              key={index}
            />
          )
        case 'input__password':
          return (
            <Input
              inputName={inputName}
              type='password'
              label={name}
              placeholder={placeholder}
              helpText={helpText}
              key={index}
            />
          )
        case 'input__email':
          return (
            <Input
              inputName={inputName}
              type='email'
              label={name}
              placeholder={placeholder}
              helpText={helpText}
              key={index}
            />
          )
        case 'input__tel':
          return (
            <Input
              inputName={inputName}
              type='tel'
              label={name}
              placeholder={placeholder}
              helpText={helpText}
              key={index}
            />
          )
      }
    })

    return (
      <div>
        <Progressbar toggled={gennySubmitting} progress={gennyUploadProgress || 0} />
        <form className={formEntry} onSubmit={this.submitData}>
          <Hero version={version} title={title} subtitle={subtitle || 'subtitle'} />

          {outputExperimental}

          <FormButtons resetForm={this.resetForm} />
        </form>
      </div>
    )
  }
}

export default view(Genny)
