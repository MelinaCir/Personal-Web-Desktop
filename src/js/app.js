/**
 * The starting point of the application.
 *
 * @author Melina Cirverius
 * @version 1.0
 */

import Chat from './Chat.js'
import MemoryGame from './MemoryGame.js'
import Window from './Window.js'
import DrawingPics from './DrawingPics.js'

// Session storage to hold z-index for all open windows.
let zIndexStorage = window.sessionStorage
zIndexStorage.setItem('zIndex', 1)

// Create a memory game.
document.querySelector('#memory-icon').addEventListener('dblclick', function (event) {
  let memoryGame = new MemoryGame()

  let memoryWindow = new Window('Memory', zIndexStorage)

  let content = memoryWindow.div.querySelector('#moveme')
  content.appendChild(memoryGame.memoryDiv)
  document.querySelector('#desktop').appendChild(content)
})

// Create a chat window.
document.querySelector('#chat-icon').addEventListener('dblclick', function (event) {
  var chat = new Chat()
  var chatWindow = new Window('Chat', zIndexStorage)

  let content = chatWindow.div.querySelector('#moveme')
  content.appendChild(chat.chatDiv)
  document.querySelector('#desktop').appendChild(content)
})

// Create a drawing application.
document.querySelector('#drawing-icon').addEventListener('dblclick', function (event) {
  var drawing = new DrawingPics()
  var window = new Window('Drawing', zIndexStorage)

  let content = window.div.querySelector('#moveme')
  content.appendChild(drawing.drawingDiv)
  document.querySelector('#desktop').appendChild(content)
})
