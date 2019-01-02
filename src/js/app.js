import memory from './Memory.js'

let memoryIcon = document.querySelector('#memory-icon')
console.log(memoryIcon)

memoryIcon.addEventListener('dblclick', function (event) {
  let memoryWindow = document.createElement('div')
  memoryWindow.setAttribute('class', 'moveme')
  let windowTitle = document.createElement('div')
  windowTitle.setAttribute('class', 'moveheader')
  windowTitle.innerText = 'Memory One'
  memoryWindow.appendChild(windowTitle)

  let div = document.querySelector('#desktop')
  div.appendChild(memoryWindow)

  let newMemory = memory.createMemoryBase(memoryWindow)
  memory.createMemory(3, 4, 'memoryblock')

  console.log('clicked!')
  movingWindow()
})

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
