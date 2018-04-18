import React from 'react'
import { view } from 'react-easy-state'

const NotFound = (props) => (
  <div>
    <h1>404 - Not found</h1>
    <p>Try these suggestions instead: </p>
    {/* insert a list from props here */}
  </div>
)

export default view(NotFound)
