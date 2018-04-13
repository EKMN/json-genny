import React from 'react'
import { view } from 'react-easy-state'
import { Link } from 'react-router-dom'

const New = (props) => (
  <a className='button is-fullwidth'>
    <span className='icon is-small'>
      <i className='far fa-plus-square' />
    </span>
    <span>New</span>
  </a>
)

const Edit = (props) => (
  <Link to='/edit' className='button is-fullwidth'>
    <span className='icon is-small'>
      <i className='far fa-edit' />
    </span>
    <span>Edit</span>
  </Link>
)

const Delete = (props) => (
  <a className='button is-fullwidth'>
    <span className='icon is-small'>
      <i className='far fa-trash-alt' />
    </span>
    <span>Delete</span>
  </a>
)

const Controls = ({ actions, saveForm, editForm, removeForm }) => (
  <div className='field has-addons'>
    <p className='control is-fullwidth is-expanded'>
      <New />
    </p>
    <p className='control is-fullwidth is-expanded'>
      <Edit />
    </p>
    <p className='control is-fullwidth is-expanded'>
      <Delete />
    </p>
  </div>
)

export default view(Controls)
