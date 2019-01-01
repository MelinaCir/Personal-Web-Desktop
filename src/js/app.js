let dragWindow = document.querySelector('#moveheader')
let container = document.querySelector('#moveme')

let active = false
let currentX
let currentY
let initialX
let initialY
let offsetX = 0
let offsetY = 0

container.addEventListener('mousedown', startMove, false)
container.addEventListener('mouseup', stopMove, false)
container.addEventListener('mouseleave', stopMove, false)
container.addEventListener('mousemove', drag, false)

function startMove (event) {
  initialX = event.clientX - offsetX
  initialY = event.clientY - offsetY

  if (event.target === dragWindow) {
    active = true
  }
}

function stopMove () {
  initialX = currentX
  initialY = currentY

  active = false
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

// let dragWindow = document.querySelector('#moveme')
// let dragPoint = document.querySelector('#moveheader')

// let currentX
// let currentY
// let initialX
// let initialY
// let offsetX = 0
// let offsetY = 0

// dragPoint.addEventListener('mousedown', function startDrag (event) {
//   initialX = event.clientX
//   initialY = event.clientY

//   dragPoint.addEventListener('mousemove', function drag (event) {
//     event.preventDefault()

//     currentX = initialX - event.clientX
//     currentY = initialY - event.clientY

//     initialX = event.clientX
//     initialY = event.clientY

//     stopDrag(currentX, currentY, dragWindow)
//   })
// })

// function stopDrag (posX, posY, elem) {
//   dragWindow.style.top = (dragWindow.offsetTop - currentY) + 'px'
//   dragWindow.style.left = (dragWindow.offsetLeft - currentX) + 'px'
// }
