import memory from './Memory.js'
import DesktopWindow from './DesktopWindow.js'
import chat from './chat.js'
import Chat2 from './Chat2.js'
import Drawing from './DrawingPics.js'
import MemoryGame from './MemoryGame.js'
import Window from './Window.js'

// "button" for memory game
let memoryIcon = document.querySelector('#memory-icon')

memoryIcon.addEventListener('dblclick', function (event) {
  var memoryGame = new MemoryGame()

  var window = new Window('Test')

  let content = window.div.querySelector('#moveme')

  content.appendChild(memoryGame.memoryDiv)

  document.querySelector('#desktop').appendChild(content)
})

// "button" for chat
let chatIcon = document.querySelector('#chat-icon')

chatIcon.addEventListener('dblclick', function (event) {
  let chat1 = document.createElement('chat-window')
  document.querySelector('#desktop').appendChild(chat1)
})
