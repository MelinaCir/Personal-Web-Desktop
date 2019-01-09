import memory from './Memory.js'
import DesktopWindow from './DesktopWindow.js'
import chat from './chat.js'

// TO DO: figure out how to create unique ids or classes for each window.

// "button" for memory game
let memoryIcon = document.querySelector('#memory-icon')

let counter = 1

memoryIcon.addEventListener('dblclick', function (event) {
  let win1 = document.createElement('desktop-window')

  document.querySelector('#desktop').appendChild(win1)
  // let here = document.querySelectorAll('desktop-window div')[0]

  // here.appendChild(memory.createMemoryBase())
  // win1.appendChild(memory.createMemory(2, 3, 'memoryblock'))

  // win1.createWindow('Memory', (memory.createMemory(2, 3, 'memoryblock')))
  // counter++

  // memory.createMemoryBase(document.querySelector('#moveme'))
  // memory.createMemory(2, 3, 'memoryblock')
})

// "button" for chat
let chatIcon = document.querySelector('#chat-icon')

chatIcon.addEventListener('dblclick', function (event) {
  let win1 = document.createElement('desktop-window')
  win1.createWindow('Chat')

  chat.setupChat()
})
