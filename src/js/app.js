import memory from './Memory.js'

let memoryIcon = document.querySelector('#memory-icon')
let counter = 1

let chatIcon = document.querySelector('#chat-icon')

memoryIcon.addEventListener('dblclick', function (event) {
  createWindow()
  memory.createMemoryBase(document.querySelector('.moveme'))
  memory.createMemory(3, 4, 'memoryblock')
})

chatIcon.addEventListener('dblclick', function (event) {
  createWindow()
  let chatP = document.createElement('p')
  chatP.innerText = 'test'
  document.querySelector('.moveme').appendChild(chatP)
})

function createWindow (event) {
  let newWindow = document.createElement('div')
  newWindow.setAttribute('class', 'moveme')
  let windowTitle = document.createElement('div')
  windowTitle.setAttribute('class', 'moveheader')
  windowTitle.innerText = 'Memory One'
  newWindow.appendChild(windowTitle)

  let div = document.querySelector('#desktop')
  div.appendChild(newWindow)

  movingWindow()
}

function movingWindow () {
  let dragWindow = document.querySelector('.moveheader')
  let container = document.querySelector('.moveme')

  let active = false
  let currentX
  let currentY
  let initialX
  let initialY
  let offsetX = 0
  let offsetY = 0

  container.addEventListener('mousedown', startMove, false)
  container.addEventListener('mousemove', drag, false)
  container.addEventListener('mouseup', stopMove, false)
  container.addEventListener('mouseleave', stopMove, false)

  function startMove (event) {
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

      setTranslate(currentX, currentY, container)
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
