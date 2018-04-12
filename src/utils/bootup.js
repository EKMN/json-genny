import state from '../utils/state'
import mockData from '../utils/example.json'

const MOCK_BOOT_TIME = 2000

const loadFormdata = async (url) => {
  await setTimeout(() => {
    state.gennyData = mockData
    state.hasBooted = true
  }, MOCK_BOOT_TIME)
}

export default (bootupUrl) => {
  loadFormdata()
}
