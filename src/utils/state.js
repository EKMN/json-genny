import { store } from 'react-easy-state'

export default store({
  appName: 'JSON Genny',
  hasBooted: false,
  isLoading: false,
  gennyData: {},
  gennySubmitting: false,
  gennySubmitStatus: null
})
