/**
 * Module for Drawing Pics
 *
 * @module src/DrawingPics
 * @author Melina Cirverius
 * @version 1.0
 */

class DrawingPics {
  constructor () {
    this.drawingDiv = document.createElement('div')
    this.drawingDiv.setAttribute('id', 'drawing')
    this.drawingContext = ''
    this.createDrawingCanvas()
  }

  elementCreate (name, attributes) {
    let node = document.createElement(name)
    if (attributes) {
      for (let attribute in attributes) {
        if (attributes.hasOwnProperty(attribute)) {
          node.setAttribute(attribute, attributes[attribute])
        }
      }
    }
    for (let i = 2; i < arguments.length; i++) {
      let child = arguments[i]
      if (typeof child === 'string') {
        child = document.createTextNode(child)
      }
      node.appendChild(child)
    }
    return node
  }

  createDrawingCanvas () {
    let drawingCanvas = this.elementCreate('canvas', { id: 'drawingcanvas', width: 300, height: 200 })
    let drawingContext = drawingCanvas.getContext('2d')

    this.drawingDiv.appendChild(drawingCanvas)
    this.createColorAndSize()

    let mouseX
    let mouseY
    let paint = false
    let offsetX = 0
    let offsetY = 0

    let colorSelect = this.drawingDiv.querySelector('select')
    colorSelect.addEventListener('change', function (event) {
      let color = colorSelect.value
      console.log(color)
      drawingContext.strokeStyle = '' + color
      console.log(drawingContext.strokeStyle)
    })

    drawingCanvas.addEventListener('mousedown', setPosition)
    drawingCanvas.addEventListener('mousemove', draw)
    drawingCanvas.addEventListener('mouseup', stopPainting)
    drawingCanvas.addEventListener('mouseleave', stopPainting)

    function stopPainting () {
      paint = false
    }

    function setPosition (event) {
      paint = true

      let canvasPosition = drawingCanvas.getBoundingClientRect()

      mouseX = (event.x - offsetX) - canvasPosition.left
      mouseY = (event.y - offsetY) - canvasPosition.top
    }

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

  createColorAndSize (drawingContext) {
    let colorTempl = document.createElement('template')
    colorTempl.innerHTML = /* html */ `
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

export default DrawingPics
