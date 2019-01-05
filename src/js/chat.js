
function setupChat () {
  let name = nameStorage.getItem('userName')
  console.log(name)

  if (!name) {
    const chatTemplate = document.createElement('template')
    chatTemplate.innerHTML = /* html */ `
      <div id="chat">
        <p>Username:</p>
        <input type="text" id="username" value="">
        <button id="submitbtn">Start Chatting</button>
        </div>
    `
    let chatClone = chatTemplate.content.cloneNode(true)
    document.querySelector('#moveme').appendChild(chatClone)

    startChat()
  } else {
    createChat()
  }
}
let nameStorage = window.sessionStorage

function startChat () {
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
    nameStorage.setItem('userName', userName)

    let inputBox = document.getElementById('username')
    let question = document.querySelector('#chat p')
    question.remove()
    inputBox.remove()
    button.remove()

    createChat()
  }
}

function createChat () {
  let user = document.createElement('h3')
  user.setAttribute('id', 'user')
  user.innerText = nameStorage.getItem('userName')
  document.querySelector('#moveme').appendChild(user)

  let messageBox = document.createElement('textarea')
  messageBox.setAttribute('name', 'textbox')
  messageBox.setAttribute('cols', '30')
  messageBox.setAttribute('rows', '5')
  document.querySelector('#moveme').appendChild(messageBox)
}

export default {
  setupChat
}
