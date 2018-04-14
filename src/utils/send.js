import axios from 'axios'
import fileToBase64 from './fileToBase64'
window.debug = true

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
  entries = await entries
    .filter((entry) => {
      const { name, value } = entry

      window.debug && console.log(name, value.length, typeof value)

      return typeof value !== 'object' || value.length
    })
    .map(async (entry) => {
      const { name, value } = entry

      // we have a file
      if (typeof value === 'object' && value.length) {
        const file = convertFiles ? await fileToBase64(value[0]) : value[0]
        window.debug && console.log('We have a file', file)
        return { [name]: file }
      }

      return { [name]: value }
    })

  return Promise.all(entries)
}

export const sendAsJson = async (event, where, protocol = 'post') => {
  const entries = await eventToEntries(event, true)

  return new Promise((resolve, reject) => {
    axios({
      method: protocol,
      url: where,
      data: entries
    })
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
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
      data: formData
    })
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
