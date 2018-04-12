import React from 'react'
import { view } from 'react-easy-state'

const Tags = ({ version, exports }) => (
  <div className='field is-grouped is-grouped-multiline'>
    <div className='control level-item has-text-centered'>
      <div className='tags has-addons'>
        <span className='tag is-dark'>form version</span>
        <span className='tag is-success'>{version}</span>
      </div>
    </div>
    <div className='control level-item has-text-centered'>
      <div className='tags has-addons'>
        <span className='tag is-dark'>exports as</span>
        <span className='tag is-danger'>{exports.as}</span>
      </div>
    </div>
    <div className='control level-item has-text-centered'>
      <div className='tags has-addons'>
        <span className='tag is-dark'>exports using</span>
        <span className='tag is-warning'>{exports.using}</span>
      </div>
    </div>
    <div className='control level-item has-text-centered'>
      <div className='tags has-addons'>
        <span className='tag is-dark'>exports to</span>
        <span className='tag is-link'>{exports.to}</span>
      </div>
    </div>
  </div>
)

export default view(Tags)
