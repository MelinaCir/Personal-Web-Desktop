class Window {
  constructor (title, counter) {
    this.title = title
    this.counter = counter
    this.div = document.createElement('div')
    this.div.setAttribute('id', 'window')
    this.createWindow()
    this.closeButton = ''
  }

  createWindow () {
    let newWindow = document.createElement('div')
    newWindow.setAttribute('id', 'moveme')
    newWindow.setAttribute('tabindex', '1')

    let windowTitle = document.createElement('div')
    windowTitle.setAttribute('class', 'moveheader')
    newWindow.appendChild(windowTitle)

    this.setWindowIcon(windowTitle)

    this.closeButton = document.createElement('button')
    this.closeButton.setAttribute('id', 'closebutton')

    windowTitle.appendChild(this.closeButton)

    this.div.appendChild(newWindow)
    this.movingWindow()

    this.closeButton.addEventListener('click', function (event) {
      newWindow.remove()
    })
  }

  setWindowIcon (windowTitle) {
    let icon = document.createElement('img')
    icon.setAttribute('class', 'window-icon')

    if (this.title === 'Memory') {
      icon.src = 'image/noungrid2.svg'
    } else if (this.title === 'Chat') {
      icon.src = 'image/noun_chat_945229.svg'
    } else if (this.title === 'Drawing') {
      icon.src = 'image/noun_drawing_921966.svg'
    }
    windowTitle.appendChild(icon)
  }

  movingWindow () {
    let active = false
    let currentX
    let currentY
    let initialX
    let initialY
    let offsetX = 0
    let offsetY = 0

    // this.counter += 1
    let zCounter = this.counter

    let dragWindow = this.div.querySelector('.moveheader')
    let container = this.div.querySelector('#moveme')

    container.addEventListener('click', getFocus, false)
    container.addEventListener('mousedown', startMove, false)
    container.addEventListener('mousemove', drag, false)
    container.addEventListener('mouseup', stopMove, false)
    container.addEventListener('mouseleave', stopMove, false)

    function getFocus () {
      console.log('focus ' + zCounter)
      zCounter = zCounter += 1
      console.log('focus ' + zCounter)
      container.style.zIndex = zCounter
      container.focus()
    }
    function startMove (event) {
      container.style.zIndex = '10'
      initialX = event.clientX - offsetX
      initialY = event.clientY - offsetY

      if (event.target === dragWindow) {
        active = true
      }
    }

    function drag (event) {
      if (active) {
        event.preventDefault()

        currentX = event.clientX - initialX
        currentY = event.clientY - initialY

        offsetX = currentX
        offsetY = currentY
        setTranslate(currentX, currentY, this)
      }
    }

    function setTranslate (xPos, yPos, elem) {
      elem.style.transform = 'translate3d(' + xPos + 'px, ' + yPos + 'px, 0)'
    }

    function loseFocus () {
      stopMove()
      container.blur()
    }

    function stopMove () {
      container.style.zIndex = '3'
      initialX = currentX
      initialY = currentY

      // container.blur()

      active = false
    }
    this.counter = zCounter
    console.log('at the end ' + this.counter)
    return this.counter
  }
}

export default Window
