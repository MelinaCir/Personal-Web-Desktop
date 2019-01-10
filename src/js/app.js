import memory from './Memory.js'
import DesktopWindow from './DesktopWindow.js'
import chat from './chat.js'
import Drawing from './DrawingPics.js'

// "button" for memory game
let memoryIcon = document.querySelector('#memory-icon')

memoryIcon.addEventListener('dblclick', function (event) {
  let win1 = document.createElement('desktop-window')

  document.querySelector('#desktop').appendChild(win1)
  let theWindow = win1.createWindow('Memory')
  win1.appendChild(theWindow)
  memory.createMemoryBase(win1)
  win1.appendChild(memory.createMemory(2, 3, 'memoryblock'))
})

// "button" for chat
let chatIcon = document.querySelector('#chat-icon')

chatIcon.addEventListener('dblclick', function (event) {
  let win1 = document.createElement('desktop-window')
  document.querySelector('#desktop').appendChild(win1)
})

Drawing.createDrawingCanvas(document.querySelector('#desktop'))
