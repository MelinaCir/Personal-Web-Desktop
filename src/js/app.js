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
import Counter from './Counter.js'

let windowCounter = new Counter()

// "button" for memory game
document.querySelector('#memory-icon').addEventListener('dblclick', function (event) {
  windowCounter.addOne()
  console.log('mem ' + windowCounter.counter)
  let memoryGame = new MemoryGame()

  let memoryWindow = new Window('Memory', windowCounter.counter)

  let content = memoryWindow.div.querySelector('#moveme')
  content.appendChild(memoryGame.memoryDiv)
  document.querySelector('#desktop').appendChild(content)
})

document.querySelector('#chat-icon').addEventListener('dblclick', function (event) {
  console.log('before chat ' + windowCounter.counter)

  windowCounter.addOne()

  var chat = new Chat()
  var chatWindow = new Window('Chat', windowCounter)

  let content = chatWindow.div.querySelector('#moveme')
  content.appendChild(chat.chatDiv)
  document.querySelector('#desktop').appendChild(content)
  console.log('after chat ' + windowCounter.counter)
})

document.querySelector('#drawing-icon').addEventListener('dblclick', function (event) {
  console.log('click')
  var draw = new DrawingPics()
  var window = new Window('Drawing', windowCounter)

  let content = window.div.querySelector('#moveme')
  content.appendChild(draw.drawingDiv)
  document.querySelector('#desktop').appendChild(content)
})
