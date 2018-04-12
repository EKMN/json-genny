import React from 'react'
import { view } from 'react-easy-state'

const Controls = ({ actions, saveForm, editForm, removeForm }) => (
  <div className='field has-addons'>
    <p className='control is-fullwidth is-expanded'>
      <a className='button is-fullwidth'>
        <span className='icon is-small'>
          <i className='far fa-save' />
        </span>
        <span>Save</span>
      </a>
    </p>
    <p className='control is-fullwidth is-expanded'>
      <a className='button is-fullwidth'>
        <span className='icon is-small'>
          <i className='far fa-edit' />
        </span>
        <span>Edit</span>
      </a>
    </p>
    <p className='control is-fullwidth is-expanded'>
      <a className='button is-fullwidth'>
        <span className='icon is-small'>
          <i className='far fa-trash-alt' />
        </span>
        <span>Delete</span>
      </a>
    </p>
  </div>
)

export default view(Controls)
