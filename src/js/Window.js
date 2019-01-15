/**
 * Module for Window
 *
 * @module src/Window
 * @author Melina Cirverius
 * @version 1.1
 */

class Window {
  constructor (title, storage) {
    this.title = title
    this.storage = storage
    this.div = document.createElement('div')
    this.div.setAttribute('id', 'window')
    this.createWindow()
    this.closeButton = ''
    this.zIndexStorage = window.sessionStorage
  }
  /**
   * Creates a new window.
   */
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

  /**
   * Sets an icon in the top bar of the window.
   *
   * @param {string} windowTitle - the title of the window and application.
   */
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

  /**
   *
   */
  movingWindow () {
    let active = false
    let currentX
    let currentY
    let initialX
    let initialY
    let offsetX = 0
    let offsetY = 0

    // this.counter += 1
    let zIndex = this.storage
    console.log(zIndex)

    let dragWindow = this.div.querySelector('.moveheader')
    let container = this.div.querySelector('#moveme')

    container.addEventListener('click', activeWindow, false)
    container.addEventListener('mousedown', startMove, false)
    container.addEventListener('mousemove', drag, false)
    container.addEventListener('mouseup', stopMove, false)
    container.addEventListener('mouseleave', stopMove, false)

    function activeWindow () {
      let theIndex = JSON.parse(zIndex.getItem('zIndex'))
      container.style.zIndex = theIndex
      theIndex++
      zIndex.setItem('zIndex', theIndex)
    }

    function startMove (event) {
      activeWindow()
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
