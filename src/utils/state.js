import { store } from 'react-easy-state'
import mockData from '../utils/example.json'

export default store({
  appName: 'JSON Genny',
  hasBooted: false,
  isLoading: false,
  gennyData: mockData || {},
  gennySubmitting: false,
  gennySubmitStatus: null,
  gennyUploadProgress: null,
  showTimeoutSuggestion: false
})
