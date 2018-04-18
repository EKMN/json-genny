// validates received json with typeofs. Creat an array, and evaluate each index. If one is false, then the validation has failed

const validator = (rawConfig) => {
  let missingFromConfig = []
  let config = {}
  let tests = {}

  // 1. check the type, and parse if JSON
  if (typeof rawConfig === 'string') {
    try {
      // attempt to parse it
      config = JSON.parse(rawConfig)
      console.log(config['title'])
    } catch (error) {
      // parsing failed
      console.log('Unable to parse config', error)
    }
  } else if (typeof rawConfig === 'object') {
    // our rawConfig is an object. We can assume it is already parsed
    config = rawConfig
  }

  // 2. test following scenarios
  tests[`config is missing a title`] = !!config['title'] // evaluate the right side

  tests[`config is missing required exports`] =
    !!config['exports'] && !!config['exports']['as'] && !!config['exports']['to'] && !!config['exports']['using']

  tests[`config is missing required formSettings`] =
    !!config['formSettings'] &&
    !!config['formSettings']['submitName'] &&
    !!config['formSettings']['resetName'] &&
    !!config['formSettings']['saveSuccess'] &&
    !!config['formSettings']['saveFail']

  tests[`config is missing at least one input`] =
    !!config['inputs'] && !!Array.isArray(config['inputs']) && !!config['inputs'].length

  tests[`config is not valid javascript`] = typeof JSON.parse(JSON.stringify(config)) === 'object'

  // 3. merge into one array
  const keys = Object.keys(tests)
  const values = Object.values(tests)

  // 4. run tests
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    const value = values[i]

    window.debug && console.log(key, value)

    // if value did not evaluate to true, test failed
    if (value !== true) {
      missingFromConfig.push(key)
    }
  }

  // return true or false whether or not config is valid
  const isValid = !missingFromConfig.length
  return {
    valid: isValid,
    failed: missingFromConfig
  }
}

export default validator
