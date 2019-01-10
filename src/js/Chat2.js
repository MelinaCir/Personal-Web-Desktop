const template = document.createElement('template')
template.innerHTML = `
<div id = "chat"></div>
`

export class Chat2 extends window.HTMLElement {
  constructor () {
    super()
    this.nameStorage = window.sessionStorage
    this.setupChat()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.div = this.shadowRoot.querySelector('#chat')
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
      this.div.appendChild(chatClone)

      this.startChat()
    } else {
      this.createChat()
    }
  }

  startChat () {
    let button = document.querySelector('#submitbtn')
    let userName

    let input = document.querySelector('#username')
    input.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        inputGiven()
      }
    })

    button.addEventListener('click', inputGiven)

    function inputGiven () {
      let value = button.previousElementSibling.value
      if (value.length === 0) return

      userName = button.previousElementSibling.value
      this.nameStorage.setItem('userName', userName)

      let inputBox = document.getElementById('username')
      let question = document.querySelector('#chat p')
      question.remove()
      inputBox.remove()
      button.remove()

      this.createChat()
    }
  }

  createChat () {
    let messageDiv = document.createElement('div')
    messageDiv.setAttribute('id', 'messages')
    this.div.appendChild(messageDiv)

    let chatSocket = new window.WebSocket('ws://vhost3.lnu.se:20080/socket/', 'chatchannel')
    let chatData = {
      'type': 'message',
      'data': '',
      'username': this.nameStorage.getItem('userName'),
      'channel': 'testChannel',
      'key': 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
    }

    // chatSocket.addEventListener('open', event => {
    //   chatSocket.send(JSON.stringify(chatData))
    // })

    chatSocket.addEventListener('message', event => {
      let answer = JSON.parse(event.data)

      if (answer.type !== 'heartbeat') {
        let user = document.createElement('h3')
        user.setAttribute('id', 'user')
        user.innerText = answer.username
        document.querySelector('#messages').appendChild(user)

        let userMessage = document.createElement('p')
        userMessage.innerText = answer.data
        document.querySelector('#messages').appendChild(userMessage)
      }
      console.log(event.data)
    })

    let messageBox = document.createElement('textarea')
    messageBox.setAttribute('name', 'textbox')
    messageBox.setAttribute('id', 'messagebox')
    messageBox.setAttribute('cols', '30')
    messageBox.setAttribute('rows', '5')
    this.div.appendChild(messageBox)

    let textBox = document.querySelector('#messagebox')

    textBox.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        event.preventDefault()

        if (textBox.value !== '') {
          chatData.data = textBox.value
          chatSocket.send(JSON.stringify(chatData))
          textBox.value = ''
        }
      }
    })
  }
}

// chatSocket.close()
window.customElements.define('chat-window', Chat2)

export default {
  Chat2
}
