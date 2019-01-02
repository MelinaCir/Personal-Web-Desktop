import memory from './Memory.js'
import DesktopWindow from './DesktopWindow.js'

// "button" for memory game
let memoryIcon = document.querySelector('#memory-icon')

memoryIcon.addEventListener('dblclick', function (event) {
  let win1 = document.createElement('desktop-window')
  win1.createWindow()

  memory.createMemoryBase(document.querySelector('#moveme'))
  memory.createMemory(2, 3, 'memoryblock')
})

// "button" for chat
let chatIcon = document.querySelector('#chat-icon')

chatIcon.addEventListener('dblclick', function (event) {
  let win1 = document.createElement('desktop-window')
  win1.createWindow()

  let chatP = document.createElement('p')
  chatP.innerText = 'test'
  document.querySelector('#moveme').appendChild(chatP)
})
