import React, { Component } from 'react'
import { view } from 'react-easy-state'
import { Link } from 'react-router-dom'

const New = (props) => (
  <a className='button is-fullwidth' {...props}>
    <span className='icon is-small'>
      <i className='far fa-plus-square' />
    </span>
    <span>New</span>
  </a>
)

const Edit = (props) => (
  <Link to='/form/edit' className='button is-fullwidth' {...props}>
    <span className='icon is-small'>
      <i className='far fa-edit' />
    </span>
    <span>Edit</span>
  </Link>
)

const Delete = (props) => (
  <a className='button is-fullwidth' {...props}>
    <span className='icon is-small'>
      <i className='far fa-trash-alt' />
    </span>
    <span>Delete</span>
  </a>
)

class Controls extends Component {
  createNewForm = () => {
    console.log('createNewForm called')
  }

  deleteThisForm = () => {
    console.log('deleteThisForm called')
  }

  render () {
    return (
      <div className='field has-addons'>
        <p className='control is-fullwidth is-expanded'>
          <New onClick={this.createNewForm} />
        </p>
        <p className='control is-fullwidth is-expanded'>
          <Edit />
        </p>
        <p className='control is-fullwidth is-expanded'>
          <Delete onClick={this.deleteThisForm} />
        </p>
      </div>
    )
  }
}

export default view(Controls)
