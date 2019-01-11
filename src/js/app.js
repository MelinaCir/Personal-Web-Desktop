import Chat2 from './Chat2.js'
import MemoryGame from './MemoryGame.js'
import Window from './Window.js'
import DrawingPics from './DrawingPics.js'

// "button" for memory game
let memoryIcon = document.querySelector('#memory-icon')

memoryIcon.addEventListener('dblclick', function (event) {
  var memoryGame = new MemoryGame()

  var window = new Window('Memory')

  let content = window.div.querySelector('#moveme')

  content.appendChild(memoryGame.memoryDiv)

  document.querySelector('#desktop').appendChild(content)
})

// "button" for chat
let chatIcon = document.querySelector('#chat-icon')

chatIcon.addEventListener('dblclick', function (event) {
  var chat = new Chat2()
  var window = new Window('Chat')

  let content = window.div.querySelector('#moveme')
  content.appendChild(chat.chatDiv)
  document.querySelector('#desktop').appendChild(content)
})

let drawingIcon = document.querySelector('#drawing-icon')

drawingIcon.addEventListener('dblclick', function (event) {
  console.log('click')
  var draw = new DrawingPics()
  var window = new Window('Drawing')

  let content = window.div.querySelector('#moveme')
  content.appendChild(draw.drawingDiv)
  document.querySelector('#desktop').appendChild(content)
})
