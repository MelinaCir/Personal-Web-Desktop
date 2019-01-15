/**
 * Module for Window
 *
 * @module src/Window
 * @author Melina Cirverius
 * @version 1.1
 */

import elementCreate from './elementCreate.js'

/**
  * Class representing a desktop window.
  *
  * @class Window
  */
class Window {
  /**
   * Creates an instance representing a desktop window.
   *
   * @param {string} title
   * @param {storage} storage
   */
  constructor (title, storage) {
    /**
     * The title for the window.
     */
    this.title = title
    /**
     * The session storage.
     */
    this.storage = storage
    /**
     * The div containing the window.
     */
    this.div = elementCreate.create('div', { id: 'window' })
    this.createWindow()
  }
  /**
   * Creates a new window.
   */
  createWindow () {
    let newWindow = elementCreate.create('div', { id: 'moveme' })
    let windowTitle = elementCreate.create('div', { class: 'moveheader' })
    newWindow.appendChild(windowTitle)

    this.setWindowIcon(windowTitle)

    let closeButton = elementCreate.create('button', { id: 'closebutton' })
    windowTitle.appendChild(closeButton)

    this.div.appendChild(newWindow)
    this.movingWindow()

    closeButton.addEventListener('click', function (event) {
      newWindow.remove()
    })
  }

  /**
   * Sets an icon in the top bar of the window.
   *
   * @param {string} windowTitle - the title of the window and application.
   */
  setWindowIcon (windowTitle) {
    let icon = elementCreate.create('img', { class: 'window-icon' })

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
   * Creates functionality to move window.
   */
  movingWindow () {
    let active = false
    let currentX
    let currentY
    let initialX
    let initialY
    let offsetX = 0
    let offsetY = 0

    let zIndex = this.storage

    let dragWindow = this.div.querySelector('.moveheader')
    let container = this.div.querySelector('#moveme')

    container.addEventListener('click', activeWindow, false)
    container.addEventListener('mousedown', startMove, false)
    container.addEventListener('mousemove', drag, false)
    container.addEventListener('mouseup', stopMove, false)
    container.addEventListener('mouseleave', stopMove, false)

    /**
     * Sets a new z-index to window when active.
     */
    function activeWindow () {
      let theIndex = JSON.parse(zIndex.getItem('zIndex'))
      container.style.zIndex = theIndex
      theIndex++
      zIndex.setItem('zIndex', theIndex)
    }

    /**
     * Sets parameters to start moving window.
     *
     * @param {event} event
     */
    function startMove (event) {
      activeWindow()
      initialX = event.clientX - offsetX
      initialY = event.clientY - offsetY

      if (event.target === dragWindow) {
        active = true
      }
    }

    /**
     * Moves the window efter mouse movement.
     *
     * @param {event} event
     */
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

    /**
     * Adds style to window that moves the window.
     * @param {number} xPos
     * @param {number} yPos
     * @param {element} elem
     */
    function setTranslate (xPos, yPos, elem) {
      elem.style.transform = 'translate3d(' + xPos + 'px, ' + yPos + 'px, 0)'
    }

    /**
     * Stops movement of window after mouse event.
     */
    function stopMove () {
      initialX = currentX
      initialY = currentY

      active = false
    }
  }
}

// Exports
export default Window
