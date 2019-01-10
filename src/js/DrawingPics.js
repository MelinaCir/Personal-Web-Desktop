function elementCreate (name, attributes) {
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

function createDrawingCanvas (putHere) {
  let drawingCanvas = elementCreate('canvas', { id: 'drawingcanvas', width: 300, height: 200 })
  let drawingContext = drawingCanvas.getContext('2d')

  putHere.appendChild(drawingCanvas)

  drawingCanvas.addEventListener('mousedown', function (event) {
    let mouseX = event.pageX - this.offSetLeft
    let mouseY = event.pageY - this.offSetTop

    paint = true
    addClick(event.pageX - this.offsetLeft, event.pageY - this.offsetTop)
    redraw()
  })

  drawingCanvas.addEventListener('mousemove', function (event) {
    if (paint) {
      addClick(event.pageX - this.offsetLeft, event.pageY - this.offsetTop, true)
      redraw()
    }
  })

  drawingCanvas.addEventListener('mouseup', function (event) {
    paint = false
  })

  drawingCanvas.addEventListener('mouseleave', function (event) {
    paint = false
  })

  let clickX = []
  let clickY = []
  let clickDrag = []
  let paint

  function addClick (x, y, dragging) {
    clickX.push(x)
    clickY.push(y)
    clickDrag.push(dragging)
  }

  function redraw () {
    drawingContext.clearRect(0, 0, drawingContext.canvas.width, drawingContext.canvas.height) // Clears the canvas

    drawingContext.strokeStyle = '#df4b26'
    drawingContext.lineJoin = 'round'
    drawingContext.lineWidth = 5

    for (var i = 0; i < clickX.length; i++) {
      drawingContext.beginPath()
      if (clickDrag[i] && i) {
        drawingContext.moveTo(clickX[i - 1], clickY[i - 1])
      } else {
        drawingContext.moveTo(clickX[i] - 1, clickY[i])
      }
      drawingContext.lineTo(clickX[i], clickY[i])
      drawingContext.closePath()
      drawingContext.stroke()
    }
  }
}

export default {
  createDrawingCanvas
}
