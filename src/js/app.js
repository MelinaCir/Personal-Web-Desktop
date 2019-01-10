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
  document.querySelector('#desktop').appendChild(memoryGame)
})

// "button" for chat
let chatIcon = document.querySelector('#chat-icon')

chatIcon.addEventListener('dblclick', function (event) {
  // let win1 = document.createElement('desktop-window')
  // let chat = win1.createWindow('Chat')
  let chat1 = document.createElement('chat-window')
  document.querySelector('#desktop').appendChild(chat1)

  // win1.appendChild(chat)
  // chat.appendChild(chat1)
  // document.querySelector('#desktop').appendChild(win1)
})

let win3 = new Window('Test')
