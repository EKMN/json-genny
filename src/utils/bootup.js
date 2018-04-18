import axios from 'axios'
import state from '../utils/state'
import mockData from '../utils/example.json'

const MOCK_BOOT_TIME = 2000

const loadFormdata = async (url) => {
  await setTimeout(() => {
    state.gennyData = mockData
    state.hasBooted = true
  }, MOCK_BOOT_TIME)
}

export const loadConfig = (path) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: path
    })
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const setData = (data) => {
  state.gennyData = data
  state.hasBooted = true
}

export default (bootupUrl) => {
  loadFormdata()
}
