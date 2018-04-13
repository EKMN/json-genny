import axios from 'axios'
window.debug = false

const eventToEntries = (event) => {
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

      return typeof value !== 'object' || value.length
    })
    .map((entry) => {
      const { name, value } = entry

      // we have a file
      if (typeof value === 'object' && value.length) {
        console.log(value[0])
        window.value = value[0]
        return { [name]: value }
      }

      return { [name]: value }
    })
}

export const sendAsJson = (event, where, protocol = 'post') => {
  const entries = eventToEntries(event)

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

export const sendAsForm = (event, where, protocol = 'post') => {
  const entries = eventToEntries(event)
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
