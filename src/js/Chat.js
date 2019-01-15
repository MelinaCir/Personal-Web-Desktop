/**
 * Module for Chat
 *
 * @module src/Chat
 * @author Melina Cirverius
 * @version 1.1
 */

class Chat {
  constructor () {
    this.nameStorage = window.sessionStorage
    this.chatDiv = document.createElement('div')
    this.chatDiv.setAttribute('id', 'chat')
    this.setupChat()
    this.chatSocket = ''
  }

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

  startChat (nameStorage, chatDiv) {
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

  createChat () {
    let messageDiv = document.createElement('div')
    messageDiv.setAttribute('id', 'messages')
    this.chatDiv.appendChild(messageDiv)

    this.chatSocket = new window.WebSocket('ws://vhost3.lnu.se:20080/socket/', 'chatchannel')

    let chatData = {
      'type': 'message',
      'data': '',
      'username': this.nameStorage.getItem('userName'),
      'channel': 'testChannel',
      'key': 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
    }

    this.chatSocket.addEventListener('message', event => {
      let answer = JSON.parse(event.data)

      if (answer.type !== 'heartbeat') {
        let user = document.createElement('h3')
        user.setAttribute('id', 'user')
        user.innerText = answer.username
        this.chatDiv.querySelector('#messages').appendChild(user)

        let userMessage = document.createElement('p')
        userMessage.innerText = answer.data
        this.chatDiv.querySelector('#messages').appendChild(userMessage)
      }
      messageDiv.scrollTop = messageDiv.scrollHeight

      console.log(event.data)
    })

    let messageBox = document.createElement('textarea')
    messageBox.setAttribute('name', 'textbox')
    messageBox.setAttribute('id', 'messagebox')
    messageBox.setAttribute('cols', '30')
    messageBox.setAttribute('rows', '5')
    this.chatDiv.appendChild(messageBox)

    let textBox = this.chatDiv.querySelector('#messagebox')

    textBox.addEventListener('keydown', event => this.sendMessage(event, this, textBox, chatData))
  }

  sendMessage (event, element, textBox, chatData) {
    if (event.key === 'Enter') {
      event.preventDefault()

      if (textBox.value !== '') {
        chatData.data = textBox.value
        element.chatSocket.send(JSON.stringify(chatData))
        textBox.value = ''
      }
    }
  }
}

export default Chat
