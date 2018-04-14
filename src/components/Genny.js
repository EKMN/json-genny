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

import notification from '../utils/notification'
import { sendAsJson, sendAsForm } from '../utils/send'

class Genny extends Component {
  componentWillUnmount () {
    // reset state and clear any timeouts
    state.gennySubmitStatus = null
    state.gennySubmitting = false
    clearTimeout(this.submitTimeout)
  }

  submitData = (event) => {
    event.preventDefault()

    // exit if genny is submitting
    if (state.gennySubmitting) {
      return false
    }

    const { exports } = state.gennyData
    const { as, to, using } = exports

    switch (as) {
      case 'json':
        // submit as json
        sendAsJson(event, to, using)
        break
      case 'form':
        // submit using FormData
        sendAsForm(event, to, using)
        break
    }

    const randomBoolean = () => !!(Math.floor(Math.random() * 10) % 2)

    state.gennySubmitStatus = null
    state.gennySubmitting = true

    this.submitTimeout = setTimeout(() => {
      const randomChance = randomBoolean()

      switch (randomChance) {
        case true:
          notification.success()
          break
        case false:
          notification.error()
          break
      }

      const message = randomChance ? 'success' : 'error'

      state.gennySubmitting = false
      state.gennySubmitStatus = message
    }, 3500)
  }

  resetForm = (event) => {
    state.gennySubmitStatus = null
    state.gennySubmitting = false
  }

  render () {
    // const { match } = this.props
    // const { params } = match
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
      <form className={formEntry} onSubmit={this.submitData}>
        <Hero version={version} title={title} subtitle={subtitle || 'subtitle'} />

        {outputExperimental}

        <FormButtons resetForm={this.resetForm} />
      </form>
    )
  }
}

export default view(Genny)
