const parseURL = (url = window.location) => {
  let parsedArguments = window.location.pathname.split('/')
  parsedArguments.shift()
  return parsedArguments
}

export default parseURL
