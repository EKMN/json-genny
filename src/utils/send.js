import axios from 'axios'
import fileToBase64 from './fileToBase64'
import state from './state'
window.debug = false

const onUploadProgress = (progressEvent) => {
  const { loaded, total } = progressEvent
  const progress = Math.floor(loaded / total * 100)
  state.gennyUploadProgress = progress
}

const resetProgress = () => {
  setTimeout(() => {
    state.gennyUploadProgress = 0
  }, 350)
}

const eventToEntries = async (event, convertFiles = false) => {
  // map through all form data
  let entries = [ ...event.target.elements ].map((element) => {
    const { name, value, files } = element
    return {
      name,
      value: files || value
    }
  })

  // remove two last entries, i.e. save and cancel buttons
  entries = entries.slice(0, -2)

  // remove empty objects if such exist.
  // key becomes the 'name' value and 'value' becomes key's value
  return entries
    .filter((entry) => {
      const { name, value } = entry

      window.debug && console.log(name, value.length, typeof value)

      return typeof value !== 'object' || value.length // only release the key-value pair if the value is a file
    })
    .reduce(async (entries, entry) => {
      entries = await entries // wait previous promise to resolve
      const { name, value } = entry

      // we have a file
      if (typeof value === 'object' && value.length) {
        const file = convertFiles ? await fileToBase64(value[0]) : value[0]
        window.debug && console.log('We have a file', file)

        entries['files'] = entries['files'] || []
        entries['files'].push({ name, data: file })
      } else {
        entries[name] = value
      }

      return entries
    }, {})
}

export const sendAsJson = async (event, where, protocol = 'post') => {
  const entries = await eventToEntries(event, true)

  return new Promise((resolve, reject) => {
    axios({
      method: protocol,
      url: where,
      data: entries,
      onUploadProgress
    })
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
      .then(() => {
        resetProgress()
      })
  })
}

export const sendAsForm = async (event, where, protocol = 'post') => {
  const entries = await eventToEntries(event)
  let formData = new window.FormData()

  for (let key in entries) {
    const { name, value } = entries[key]
    formData.append(name, value)
  }

  return new Promise((resolve, reject) => {
    axios({
      method: protocol,
      url: where,
      data: formData,
      onUploadProgress
    })
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
      .then(() => {
        resetProgress()
      })
  })
}
