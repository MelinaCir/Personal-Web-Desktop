import memory from './Memory.js'
import DesktopWindow from './DesktopWindow.js'
import chat from './chat.js'

// TO DO: figure out how to create unique ids or classes for each window.

// "button" for memory game
// let memoryIcon = document.querySelector('#memory-icon')

// memoryIcon.addEventListener('dblclick', function (event) {
//   let win1 = document.createElement('desktop-window')
//   win1.createWindow('Memory')

//   memory.createMemoryBase(document.querySelector('#moveme'))
//   memory.createMemory(2, 3, 'memoryblock')
// })

// "button" for chat
let chatIcon = document.querySelector('#chat-icon')

chatIcon.addEventListener('dblclick', function (event) {
  let win1 = document.createElement('desktop-window')
  win1.createWindow('Chat')

  chat.setupChat()
})
