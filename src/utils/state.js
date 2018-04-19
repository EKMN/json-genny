import { store } from 'react-easy-state'
import mockData from '../utils/example.json'

export default store({
  appName: 'JSON Genny',
  hasBooted: false,
  isLoading: false,
  currentPath: null,
  gennyData: mockData || {},
  gennyDraftData: JSON.stringify(mockData, null, 2),
  gennySubmitting: false,
  gennySubmitStatus: null,
  gennyUploadProgress: null,
  showTimeoutSuggestion: false
})
