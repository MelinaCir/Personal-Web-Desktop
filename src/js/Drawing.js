
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

let drawingControls = Object.create(null)

function createDrawingCanvas (parent) {
  let drawingCanvas = elementCreate('canvas', { id: 'drawingcanvas', width: 300, height: 200 })
  let drawingContext = drawingCanvas.getContext('2d')

  let toolbar = elementCreate('div', { class: 'toolbar' })
  for (let control in drawingControls) {
    toolbar.appendChild(drawingControls[control](drawingContext))
  }
  let panel = elementCreate('div', { class: 'drawpanel' }, drawingCanvas)
  parent.appendChild(elementCreate('div', null, panel, toolbar))
}

let tools = Object.create(null)

drawingControls.tool = function (drawingContext) {
  let select = elementCreate('select')

  for (let tool in tools) {
    select.appendChild(elementCreate('option', null, tool))
  }

  drawingContext.addEventListener('mousedown', function (event) {
    if (event.which === 1) {
      tools[select.value](event, drawingContext)
      event.preventDefault()
    }
  })
  return elementCreate('span', null, 'Tool: ', select)
}

function relativePos (event, element) {
  var rect = element.getBoundingClientRect()
  return { x: Math.floor(event.clientX - rect.left),
    y: Math.floor(event.clientY - rect.top) }
}
