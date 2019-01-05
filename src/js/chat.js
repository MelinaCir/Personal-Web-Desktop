
function createChat () {
  let question = document.createElement('p')
  question.innerText = 'Username: '
  document.querySelector('#moveme').appendChild(question)

  let nameInput = document.createElement('input')
  nameInput.setAttribute('type', 'text')
  nameInput.setAttribute('id', 'username')
  nameInput.setAttribute('value', '')

  document.querySelector('#moveme').appendChild(nameInput)

  let submitBtn = document.createElement('button')
  submitBtn.setAttribute('id', 'submitbtn')
  submitBtn.innerText = 'Start chatting'
  document.querySelector('#moveme').appendChild(submitBtn)

  startChat()
}
let nameStorage = window.sessionStorage

function startChat () {
  let button = document.querySelector('#submitbtn')
  let userName

  button.addEventListener('click', function buttonClick (event) {
    let value = button.previousElementSibling.value
    if (value.length === 0) return

    userName = button.previousElementSibling.value
    nameStorage.setItem('userName', userName)

    let inputBox = document.getElementById('username')
    let question = document.querySelector('#moveme p')
    question.remove()
    inputBox.remove()
    button.remove()
  })
}

// let user = document.createElement('h3')
// user.setAttribute('id', 'user')
// user.innerText = 'TestPlayer'
// document.querySelector('#moveme').appendChild(user)

export default {
  createChat,
  startChat
}
