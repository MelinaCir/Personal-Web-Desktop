import Chat2 from './Chat2.js'
import MemoryGame from './MemoryGame.js'
import Window from './Window.js'
import DrawingPics from './DrawingPics.js'
import Counter from './Counter.js'

let windowCounter = new Counter()

// "button" for memory game
let memoryIcon = document.querySelector('#memory-icon')

document.querySelector('#memory-icon').addEventListener('dblclick', function (event) {
  windowCounter.addOne()
  console.log('mem ' + windowCounter.counter)
  let memoryGame = new MemoryGame()

  let memoryWindow = new Window('Memory', windowCounter.counter)

  let content = memoryWindow.div.querySelector('#moveme')
  content.appendChild(memoryGame.memoryDiv)
  document.querySelector('#desktop').appendChild(content)
})

// "button" for chat
let chatIcon = document.querySelector('#chat-icon')

chatIcon.addEventListener('dblclick', function (event) {
  console.log('before chat ' + windowCounter.counter)

  windowCounter.addOne()

  var chat = new Chat2()
  var chatWindow = new Window('Chat', windowCounter)

  let content = chatWindow.div.querySelector('#moveme')
  content.appendChild(chat.chatDiv)
  document.querySelector('#desktop').appendChild(content)
  console.log('after chat ' + windowCounter.counter)
})

let drawingIcon = document.querySelector('#drawing-icon')

drawingIcon.addEventListener('dblclick', function (event) {
  console.log('click')
  var draw = new DrawingPics()
  var window = new Window('Drawing', windowCounter)

  let content = window.div.querySelector('#moveme')
  content.appendChild(draw.drawingDiv)
  document.querySelector('#desktop').appendChild(content)
})
