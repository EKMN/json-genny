const defaults = {
  progressBar: true,
  timeout: 1750,
  layout: 'topCenter',
  theme: 'semanticui'
}

// the line below is an example of destructuring an argument, that has a default value, `,
// as well as destructuring away values from within it
// { text = 'Success', layout = 'topRight', theme = 'metroui' } = {}

export default {
  success: (text = 'Success', timeout = defaults.timeout) => {
    new window.Noty({
      ...defaults,
      text,
      timeout,
      type: 'success'
    }).show()
  },
  error: (text = 'Error', timeout = defaults.timeout) => {
    new window.Noty({
      ...defaults,
      text,
      timeout,
      type: 'error'
    }).show()
  },
  warning: (text = 'Warning', timeout = defaults.timeout) => {
    new window.Noty({
      ...defaults,
      text,
      timeout,
      type: 'warning'
    }).show()
  }
}
