class DesktopWindow extends window.HTMLElement {
  constructor () {
    super()
  }
  connectedCallback () {}

  // Create a new window for the activated button
  createWindow (num) {
    let newWindow = document.createElement('div')
    newWindow.setAttribute('id', 'moveme')

    let windowTitle = document.createElement('div')
    windowTitle.setAttribute('class', 'moveheader')
    windowTitle.innerText = 'Memory One'
    newWindow.appendChild(windowTitle)

    let closeButton = document.createElement('button')
    closeButton.setAttribute('id', 'closebutton')
    windowTitle.appendChild(closeButton)

    let div = document.querySelector('#desktop')
    div.appendChild(newWindow)

    this.movingWindow()

    closeButton.addEventListener('click', function () {
    // let openWindow = document.getElementById('moveme')
      newWindow.remove()
    })
  }

  movingWindow () {
    let dragWindow = document.querySelector('.moveheader')
    let container = document.querySelector('#moveme')

    let active = false
    let currentX
    let currentY
    let initialX
    let initialY
    let offsetX = 0
    let offsetY = 0

    container.addEventListener('mousedown', startMove, false)
    container.addEventListener('mousemove', drag, false)
    container.addEventListener('mouseup', stopMove, false)
    container.addEventListener('mouseleave', stopMove, false)

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

        setTranslate(currentX, currentY, container)
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

window.customElements.define('desktop-window', DesktopWindow)

export default {
  DesktopWindow
}
