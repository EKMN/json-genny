import { view } from 'react-easy-state'
import state from '../utils/state'

const Edit = ({ children }) => {
  const { hasBooted } = state
  return hasBooted && children
}

export default view(Edit)
