class Window {
  constructor (title) {
    this.title = title
    this.div = document.createElement('div')
    this.div.setAttribute('id', 'window')
    this.createWindow()
  }

  createWindow () {
    let newWindow = document.createElement('div')
    newWindow.setAttribute('id', 'moveme')

    let windowTitle = document.createElement('div')
    windowTitle.setAttribute('class', 'moveheader')
    windowTitle.innerText = this.title
    newWindow.appendChild(windowTitle)

    let closeButton = document.createElement('button')
    closeButton.setAttribute('id', 'closebutton')
    windowTitle.appendChild(closeButton)

    console.log(this.test)
    this.movingWindow()

    closeButton.addEventListener('click', function () {
      newWindow.remove()
    })
    this.div.appendChild(newWindow)
  }

  movingWindow () {
    let active = false
    let currentX
    let currentY
    let initialX
    let initialY
    let offsetX = 0
    let offsetY = 0

    let dragWindow = document.querySelector('.moveheader')

    this.div.addEventListener('mousedown', startMove, false)
    this.div.addEventListener('mousemove', drag, false)
    this.div.addEventListener('mouseup', stopMove, false)
    this.div.addEventListener('mouseleave', stopMove, false)

    function startMove (event) {
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

    function stopMove () {
      initialX = currentX
      initialY = currentY

      active = false
    }
  }
}

export default Window
