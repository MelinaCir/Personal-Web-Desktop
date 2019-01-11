class DrawingPics {
  constructor () {
    this.drawingDiv = document.createElement('div')
    this.drawingDiv.setAttribute('id', 'drawing')
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

    let mouseX
    let mouseY
    let currentX
    let currentY
    let offsetX = 0
    let offsetY = 0
    let paint

    drawingCanvas.addEventListener('mousedown', function (event) {
      console.log(event)
      mouseX = event.clientX - this.offsetLeft
      mouseY = event.clientY - this.offsetTop
      console.log('mouse' + mouseX)

      // setPosition()
      paint = true
      addClick(mouseX, mouseY)
      redraw()
    })

    drawingCanvas.addEventListener('mousemove', function (event) {
      if (paint) {
        event.preventDefault()

        addClick(event.clientX - this.offsetLeft, event.clientY - this.offsetTop, true)
        redraw()
      }
    })

    drawingCanvas.addEventListener('mouseup', function (event) {
      paint = false
    })

    drawingCanvas.addEventListener('mouseleave', function (event) {
      paint = false
    })

    // function setPosition (event) {
    //   currentX = event.clientX
    //   currentY = event.clientY
    // }

    let clickX = []
    let clickY = []
    let clickDrag = []

    function addClick (x, y, dragging) {
      clickX.push(x)
      clickY.push(y)
      clickDrag.push(dragging)
    }

    function redraw () {
      drawingContext.clearRect(0, 0, drawingContext.canvas.width, drawingContext.canvas.height)

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
}

export default DrawingPics
