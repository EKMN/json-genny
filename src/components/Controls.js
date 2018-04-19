import React, { Component } from 'react'
import { view } from 'react-easy-state'
import { Link } from 'react-router-dom'
import state from '../utils/state'

const New = ({ onClick }) => (
  <a onClick={onClick} className='button is-fullwidth'>
    <span className='icon is-small'>
      <i className='far fa-plus-square' />
    </span>
    <span>New</span>
  </a>
)

const Edit = ({ url }) => (
  <Link to={url} className='button is-fullwidth'>
    <span className='icon is-small'>
      <i className='far fa-edit' />
    </span>
    <span>Edit</span>
  </Link>
)

const Delete = ({ onClick }) => (
  <a onClick={onClick} className='button is-fullwidth'>
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
    const { currentPath } = state
    return (
      <div className='field has-addons'>
        <p className='control is-fullwidth is-expanded'>
          <New onClick={this.createNewForm} />
        </p>
        <p className='control is-fullwidth is-expanded'>
          <Edit url={`${currentPath}/edit`} />
        </p>
        <p className='control is-fullwidth is-expanded'>
          <Delete onClick={this.deleteThisForm} />
        </p>
      </div>
    )
  }
}

export default view(Controls)
