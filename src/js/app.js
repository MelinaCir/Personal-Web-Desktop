let dragWindow = document.querySelector('#moveme')
let container = document.querySelector('#outer')

let active = false
let currentX
let currentY
let initialX
let initialY
let offsetX = 0
let offsetY = 0

container.addEventListener('mousedown', dragStart, false)
container.addEventListener('mouseup', dragEnd, false)
container.addEventListener('mousemove', drag, false)

function dragStart (e) {
  initialX = e.clientX - offsetX
  initialY = e.clientY - offsetY

  if (e.target === dragWindow) {
    active = true
  }
}

function dragEnd (e) {
  initialX = currentX
  initialY = currentY

  active = false
}

function drag (e) {
  if (active) {
    e.preventDefault()

    currentX = e.clientX - initialX
    currentY = e.clientY - initialY

    offsetX = currentX
    offsetY = currentY

    setTranslate(currentX, currentY, dragWindow)
  }
}

function setTranslate (xPos, yPos, elem) {
  elem.style.transform = 'translate3d(' + xPos + 'px, ' + yPos + 'px, 0)'
}
