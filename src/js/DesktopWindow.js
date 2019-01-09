const windowTemplate = document.createElement('template')
windowTemplate.innerHTML = /* html */ `
<style>
:host {
  position: absolute;
  z-index: 9;
  background-color: rgb(196, 245, 253);
  border: 1px solid black;
  text-align: center;
  width: 250px;
}

.moveheader {
  padding: 5px;
  z-index: 10;
  background-color: blueviolet;
  touch-action: none;
  user-select: none;
}
</style>


  <div class="moveheader">
    <button id="closebutton"></button>
    <p>Test</p>
  </div>

`

let active = false
let currentX
let currentY
let initialX
let initialY
let offsetX = 0
let offsetY = 0

class DesktopWindow extends window.HTMLElement {
  constructor () {
    super()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(windowTemplate.content.cloneNode(true))
    this._button = this.shadowRoot.querySelector('#closebutton')
    this._div = this.shadowRoot.querySelector('#moveme')
    this.dragWindow = this.shadowRoot.querySelector('.moveheader')
  }
  connectedCallback () {
    this.dragWindow.addEventListener('mousedown', this.startMove, false)
    this.dragWindow.addEventListener('mousemove', this.drag, false)
    this.dragWindow.addEventListener('mouseup', this.stopMove, false)
    this.dragWindow.addEventListener('mouseleave', this.stopMove, false)
  }

  // Create a new window for the activated button
  // createWindow (title, type) {
  //   // this.test = 'move' + this.counter
  //   // this.counter++

  //   // let newWindow = document.createElement('div')
  //   // newWindow.setAttribute('id', 'moveme')

  //   // let windowTemplate = document.createElement('template')
  //   // windowTemplate.innerHTML = /* html */ `
  //   //   <div class="moveheader">
  //   //     <button id="closebutton">
  //   //   </div>
  //   // `

  //   let windowTitle = document.createElement('div')
  //   windowTitle.setAttribute('class', 'moveheader')
  //   windowTitle.innerText = title
  //   newWindow.appendChild(windowTitle)

  //   let closeButton = document.createElement('button')
  //   closeButton.setAttribute('id', 'closebutton')
  //   windowTitle.appendChild(closeButton)

  //   newWindow.appendChild(type)

  //   let div = document.querySelector('#desktop')
  //   div.appendChild(newWindow)

  //   console.log(this.test)
  //   this.movingWindow()

  //   closeButton.addEventListener('click', function () {
  //   // let openWindow = document.getElementById('moveme')
  //     newWindow.remove()
  //   })
  // }

  // movingWindow () {
  // let dragWindow = document.querySelector('.moveheader')
  // let container = document.getElementById('moveme')

  // container.addEventListener('mousedown', startMove, false)
  // container.addEventListener('mousemove', drag, false)
  // container.addEventListener('mouseup', stopMove, false)
  // container.addEventListener('mouseleave', stopMove, false)

  startMove (event) {
    initialX = event.clientX - offsetX
    initialY = event.clientY - offsetY

    if (event.target === this.dragWindow) {
      active = true
    }
  }

  drag (event) {
    if (active) {
      event.preventDefault()

      currentX = event.clientX - initialX
      currentY = event.clientY - initialY

      offsetX = currentX
      offsetY = currentY

      this.setTranslate(currentX, currentY, this)
    }
  }

  setTranslate (xPos, yPos, elem) {
    elem.style.transform = 'translate3d(' + xPos + 'px, ' + yPos + 'px, 0)'
  }

  stopMove () {
    initialX = currentX
    initialY = currentY

    active = false
  }
}

window.customElements.define('desktop-window', DesktopWindow)

export default {
  DesktopWindow
}
