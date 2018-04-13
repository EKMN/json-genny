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
  success: (text = 'Success') => {
    new window.Noty({
      ...defaults,
      text,
      type: 'success'
    }).show()
  },
  error: (text = 'Error') => {
    new window.Noty({
      ...defaults,
      text,
      type: 'error'
    }).show()
  },
  warning: (text = 'Warning') => {
    new window.Noty({
      ...defaults,
      text,
      type: 'warning'
    }).show()
  }
}
