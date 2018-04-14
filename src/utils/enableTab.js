// enables tab for text area
const enableTab = (id) => {
  const element = document.getElementById(id)
  element.onkeydown = (e) => {
    if (e.keyCode === 9) {
      // tab was pressed

      // get caret position/selection
      const val = this.value
      const start = this.selectionStart
      const end = this.selectionEnd

      // set textarea value to: text before caret + tab + text after caret
      this.value = val.substring(0, start) + '\t' + val.substring(end)

      // put caret at right position again
      this.selectionStart = this.selectionEnd = start + 1

      // prevent the focus lose
      return false
    }
  }
}

export default enableTab
