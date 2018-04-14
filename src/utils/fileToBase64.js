const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    let reader = new window.FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.onerror = (error) => {
      reject(error)
    }
  })
}

export default fileToBase64
