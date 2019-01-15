/**
 * Module for Chat
 *
 * @module src/Chat
 * @author Melina Cirverius
 * @version 1.1
 */

import elementCreate from './elementCreate.js'

/**
  * Class representing a chat application.
  *
  * @class Chat
  */
class Chat {
  /**
   * Creates an intance representing a chat application.
   *
   * @constructor
   */
  constructor () {
    /**
     * Session storage to save username.
     */
    this.nameStorage = window.sessionStorage
    /**
     * The div element containing the chat.
     */
    this.chatDiv = elementCreate.create('div', { id: 'chat' })
    /**
     * A variable for the websocket.
     */
    this.chatSocket = ''
    this.setupChat()
  }

  /**
   * Creates the starting point for the app to let user choose a username.
   */
  setupChat () {
    let name = this.nameStorage.getItem('userName')

    if (!name) {
      const chatTemplate = document.createElement('template')
      chatTemplate.innerHTML = /* html */ `
        <p>Username:</p>
        <input type="text" id="username" value="">
        <button id="submitbtn">Start Chatting</button>
    `
      let chatClone = chatTemplate.content.cloneNode(true)
      this.chatDiv.appendChild(chatClone)

      this.startChat(this.nameStorage, this.chatDiv)
    } else {
      this.createChat()
    }
  }

  /**
   * Clears the div to create the chat.
   *
   * @param {session storage} nameStorage
   */
  startChat (nameStorage) {
    let button = this.chatDiv.querySelector('#submitbtn')

    let userName

    button.addEventListener('click', event => inputGiven(this))

    function inputGiven (element) {
      let value = button.previousElementSibling.value
      if (value.length === 0) return

      userName = value
      nameStorage.setItem('userName', userName)

      let inputBox = document.getElementById('username')
      let question = document.querySelector('#chat p')
      question.remove()
      inputBox.remove()
      button.remove()

      element.createChat()
    }
  }

  /**
   * Creates the chat application.
   */
  createChat () {
    let messageDiv = elementCreate.create('div', { id: 'messages' })
    this.chatDiv.appendChild(messageDiv)

    this.chatSocket = new window.WebSocket('ws://vhost3.lnu.se:20080/socket/', 'chatchannel')

    let chatData = {
      'type': 'message',
      'data': '',
      'username': this.nameStorage.getItem('userName'),
      'channel': 'myOwnChannel',
      'key': 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
    }

    this.chatSocket.addEventListener('message', event => {
      let answer = JSON.parse(event.data)

      if (answer.type !== 'heartbeat') {
        let user = elementCreate.create('h3', { id: 'user' })
        user.innerText = answer.username
        this.chatDiv.querySelector('#messages').appendChild(user)

        let userMessage = document.createElement('p')
        userMessage.innerText = answer.data
        this.chatDiv.querySelector('#messages').appendChild(userMessage)
      }
      messageDiv.scrollTop = messageDiv.scrollHeight
    })

    let messageBox = elementCreate.create('textarea',
      { name: 'textbox', id: 'messagebox', cols: 30, rows: 5 })
    this.chatDiv.appendChild(messageBox)

    let textBox = this.chatDiv.querySelector('#messagebox')
    let chatSocket = this.chatSocket
    textBox.addEventListener('keydown', event =>
      sendMessage(event, chatSocket, textBox, chatData))

    /**
       * Sends messages to server via the web socket.
       *
       * @param {event} event
       * @param {WebSocket} chatSocket
       * @param {element} textBox
       * @param {object} chatData
       */
    function sendMessage (event, chatSocket, textBox, chatData) {
      if (event.key === 'Enter') {
        event.preventDefault()

        if (textBox.value !== '') {
          chatData.data = textBox.value
          chatSocket.send(JSON.stringify(chatData))
          textBox.value = ''
        }
      }
    }
  }
}

// Exports
export default Chat
