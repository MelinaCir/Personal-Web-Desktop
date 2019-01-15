/**
 * Module for Drawing Pics
 *
 * @module src/DrawingPics
 * @author Melina Cirverius
 * @version 1.0
 */

import elementCreate from './elementCreate.js'
/**
  * Class representing a drawing application.
  *
  * @class DrawingPics
  */
class DrawingPics {
  /**
   * Creates an instance representing a drawing application.
   *
   * @constructor
   */
  constructor () {
    /**
     * The div containing the application.
     */
    this.drawingDiv = elementCreate.create('div', { id: 'drawing' })
    this.drawingContext = ''
    this.createDrawingCanvas()
  }

  /**
   * Creates the drawing application.
   */
  createDrawingCanvas () {
    let drawingCanvas = elementCreate.create('canvas',
      { id: 'drawingcanvas', width: 400, height: 300 })
    let drawingContext = drawingCanvas.getContext('2d')

    this.drawingDiv.appendChild(drawingCanvas)
    this.createColor()

    let mouseX
    let mouseY
    let paint = false
    let offsetX = 0
    let offsetY = 0

    let colorSelect = this.drawingDiv.querySelector('select')

    colorSelect.addEventListener('change', function () {
      let color = colorSelect.value
      drawingContext.strokeStyle = '' + color
    })

    drawingCanvas.addEventListener('mousedown', setPosition)
    drawingCanvas.addEventListener('mousemove', draw)
    drawingCanvas.addEventListener('mouseup', stopPainting)
    drawingCanvas.addEventListener('mouseleave', stopPainting)

    /**
     * Set boolean value paint to false to stop painting.
     */
    function stopPainting () {
      paint = false
    }

    /**
     * Sets the positions of the mouse to draw.
     *
     * @param {event} event
     */
    function setPosition (event) {
      paint = true

      let canvasPosition = drawingCanvas.getBoundingClientRect()

      mouseX = (event.x - offsetX) - canvasPosition.left
      mouseY = (event.y - offsetY) - canvasPosition.top
    }

    /**
     * Draws lines on canvas from mouse movement.
     *
     * @param {event} event
     */
    function draw (event) {
      if (paint) {
        if (event.buttons !== 1) return

        drawingContext.beginPath()
        drawingContext.lineJoin = 'round'
        drawingContext.lineCap = 'round'
        drawingContext.lineWidth = 5

        drawingContext.moveTo(mouseX, mouseY)
        setPosition(event)
        drawingContext.lineTo(mouseX, mouseY)
        drawingContext.stroke()
      }
    }
  }

  /**
   * Creates a select element to choose color of brush.
   */
  createColor () {
    let colorTempl = document.createElement('template')
    colorTempl.innerHTML = /* html */ `
      <p>Color:</p>
        <select name="colors" id="colorselect">
          <option value="black">Black</option>
          <option value="red">Red</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
          <option value="yellow">Yellow</option>
        </select>
    `
    let colorClone = colorTempl.content.cloneNode(true)
    this.drawingDiv.appendChild(colorClone)
  }
}

// Exports
export default DrawingPics
