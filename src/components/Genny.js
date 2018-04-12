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

class Genny extends Component {
  submitData (e) {
    e.preventDefault()

    // exit if gennyIsSubmitting
    if (state.gennySubmitting) {
      return false
    }

    const randomBoolean = () => !!(Math.floor(Math.random() * 10) % 2)

    state.gennySubmitStatus = null
    state.gennySubmitting = true

    setTimeout(() => {
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

  resetForm (e) {
    state.gennySubmitStatus = null
    state.gennySubmitting = false
  }

  render () {
    const { match } = this.props
    const { params } = match
    const { title, inputs, version } = state.gennyData

    const outputExperimental = inputs.map((input, index) => {
      const { type } = input
      const { name, filename, fileLabel, fileIcon, helpText, options, icon, placeholder } = input
      switch (type) {
        case 'file':
          return (
            <File
              label={name}
              fileLabel={fileLabel}
              filename={filename}
              fileIcon={fileIcon}
              helpText={helpText}
              key={index}
            />
          )
        case 'select':
          return <Select options={options} label={name} icon={icon} helpText={helpText} key={index} />
        case 'select-input':
          return (
            <SelectInput options={options} label={name} placeholder={placeholder} helpText={helpText} key={index} />
          )
        case 'textarea':
          return <Textarea label={name} placeholder={placeholder} helpText={helpText} key={index} />
        case 'input__text':
          return <Input type='text' label={name} placeholder={placeholder} helpText={helpText} key={index} />
        case 'input__password':
          return <Input type='password' label={name} placeholder={placeholder} helpText={helpText} key={index} />
        case 'input__email':
          return <Input type='email' label={name} placeholder={placeholder} helpText={helpText} key={index} />
        case 'input__tel':
          return <Input type='tel' label={name} placeholder={placeholder} helpText={helpText} key={index} />
      }
    })

    return (
      <form className={formEntry} onSubmit={this.submitData}>
        <Hero version={version} title={title} subtitle={params.resource || 'subtitle'} />

        {outputExperimental}

        <FormButtons resetForm={this.resetForm} />
      </form>
    )
  }
}

export default view(Genny)
