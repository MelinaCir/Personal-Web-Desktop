class Window {
  constructor (title, webSocket) {
    this.title = title
    this.webSocket = webSocket
    this.div = document.createElement('div')
    this.div.setAttribute('id', 'window')
    this.createWindow()
    this.closeButton = ''
  }

  createWindow () {
    let newWindow = document.createElement('div')
    newWindow.setAttribute('id', 'moveme')

    let windowTitle = document.createElement('div')
    windowTitle.setAttribute('class', 'moveheader')
    windowTitle.innerText = this.title
    newWindow.appendChild(windowTitle)

    this.closeButton = document.createElement('button')
    this.closeButton.setAttribute('id', 'closebutton')

    windowTitle.appendChild(this.closeButton)

    this.div.appendChild(newWindow)
    this.movingWindow()

    this.closeButton.addEventListener('click', event => closeChat(this.webSocket))

    function closeChat (webSocket) {
      newWindow.remove()
      console.log(webSocket)
      webSocket.close()
    }
  }

  movingWindow () {
    let active = false
    let currentX
    let currentY
    let initialX
    let initialY
    let offsetX = 0
    let offsetY = 0

    let dragWindow = this.div.querySelector('.moveheader')
    let container = this.div.querySelector('#moveme')

    container.addEventListener('mousedown', startMove, false)
    container.addEventListener('mousemove', drag, false)
    container.addEventListener('mouseup', stopMove, false)
    container.addEventListener('mouseleave', stopMove, false)

    function startMove (event) {
      initialX = event.clientX - offsetX
      initialY = event.clientY - offsetY

      container.setAttribute('z-index', 11)

      if (event.target === dragWindow) {
        active = true
        console.log(container)
        container.focus()
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

    function stopMove () {
      initialX = currentX
      initialY = currentY

      container.setAttribute('z-index', '9')

      active = false
    }
  }
}

export default Window
