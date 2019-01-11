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
    let paint = false
    let offsetX = 0
    let offsetY = 0

    drawingCanvas.addEventListener('mousedown', setPosition)

    drawingCanvas.addEventListener('mousemove', draw)

    drawingCanvas.addEventListener('mouseup', stopPainting)

    drawingCanvas.addEventListener('mouseleave', stopPainting)

    function stopPainting () {
      paint = false
    }

    function setPosition (event) {
      paint = true
      console.log(event)

      mouseX = event.x - offsetX
      mouseY = event.y - offsetY
    }

    function setTranslate (xPos, yPos, elem) {
      console.log(elem)
      console.log(elem.style)
      elem.style.transform = 'translate3d(' + xPos + 'px, ' + yPos + 'px, 0)'
    }

    function draw (event) {
      if (paint) {
        if (event.buttons !== 1) return

        drawingContext.beginPath()
        drawingContext.strokeStyle = '#df4b26'
        drawingContext.lineJoin = 'round'
        drawingContext.lineCap = 'round'
        drawingContext.lineWidth = 5

        drawingContext.moveTo(mouseX, mouseY)
        setPosition(event)
        console.log(event)
        console.log(mouseX, mouseY)
        drawingContext.lineTo(mouseX, mouseY)
        drawingContext.stroke()

        currentX = event.clientX - mouseX
        currentY = event.clientY - mouseY

        offsetX = currentX
        offsetY = currentY
        setTranslate(mouseX, mouseY, this)
      }
    }
  }
}

export default DrawingPics
