/**
 * Module for Memory Game
 *
 * @module src/MemoryGame
 * @author Melina Cirverius
 * @version 1.2
 */

import elementCreate from './elementCreate.js'

/**
  * Class representing a memory game.
  *
  * @class MemoryGame
  */
class MemoryGame {
  /**
   * Creates an instance that represents a memory game.
   *
   * @constructor
   */
  constructor () {
    /**
     * The div element containing the game.
     */
    this.memoryDiv = elementCreate.create('div', { id: 'memoryblock' })
    this.createMemoryBase()
  }

  /**
   * Creates the base of the Memory Game.
   */
  createMemoryBase () {
    let memoryTpl = document.createElement('template')
    this.memoryDiv.appendChild(memoryTpl)

    memoryTpl.innerHTML = /* html */ `
              <div class="memory">
                  <a href="#"><img src="image/0.png" alt="Memory brick" /></a>
              </div>
    `
    this.createMemoryChoice(memoryTpl)
  }

  /**
   * Creates choices of size of game board.
   *
   * @param {element} template
   */
  createMemoryChoice (template) {
    const choiceTemplate = document.createElement('template')

    choiceTemplate.innerHTML = /* html */ `
      <p>Choose size of Memory Game:</p>
      <img src="image/noungrid2.svg" id="twotwo" class="memorysize">
      <img src="image/noun_grid_45666.svg" id="fourfour" class="memorysize">
  `
    let choiceClone = choiceTemplate.content.cloneNode(true)
    this.memoryDiv.appendChild(choiceClone)

    this.createMemorySize(template, this)
  }

  /**
   * Creates size of game board after choice.
   *
   * @param {element} template
   * @param {element} element
   */
  createMemorySize (template, element) {
    let twoTwo = this.memoryDiv.querySelector('#twotwo')
    let fourFour = this.memoryDiv.querySelector('#fourfour')

    twoTwo.addEventListener('click', function () {
      removeChoice()
      element.createMemory(2, 2, template)
    })

    fourFour.addEventListener('click', function () {
      removeChoice()
      element.createMemory(4, 4, template)
    })

    /**
     * Removes elements from DOM.
     */
    function removeChoice () {
      twoTwo.previousElementSibling.remove()
      twoTwo.remove()
      fourFour.remove()
    }
  }

  /**
   * Creates memory board with cards.
   * @param {number} rows
   * @param {number} cols
   * @param {template} template
   */
  createMemory (rows, cols, template) {
    let a
    let tiles = []
    let turn1
    let turn2
    let lastTile
    let pairs = 0
    let tries = 0

    tiles = this.createImgArray(rows, cols)

    let templateDiv = template.content.firstElementChild

    let div = document.importNode(templateDiv, false)

    tiles.forEach(function (tile, index) {
      a = document.importNode(templateDiv.firstElementChild, true)

      a.firstElementChild.setAttribute('data-bricknumber', index)

      div.appendChild(a)

      if ((index + 1) % cols === 0) {
        div.appendChild(document.createElement('br'))
      }
    })

    div.addEventListener('click', event => turnBrick(event))

    this.memoryDiv.appendChild(div)

    function turnBrick (event) {
      event.preventDefault()

      let img = event.target.nodeName === 'IMG' ? event.target : event.target.firstElementChild
      let index = parseInt(img.getAttribute('data-bricknumber'))

      let tile = tiles[index]

      if (turn2) {
        return
      }

      img.src = 'image/' + tile + '.png'
      if (!turn1) {
      // first turn
        turn1 = img
        lastTile = tile
      } else {
      // second turn
        if (img === turn1) {
          return
        }

        tries++
        turn2 = img

        if (tile === lastTile) {
          pairs++
          // Timer that hides tiles after match has been made.
          setTimeout(function () {
            turn1.parentNode.classList.add('removed')
            turn2.parentNode.classList.add('removed')

            turn1 = null
            turn2 = null
          }, 300)
        } else {
          // Timer that flips tiles back after no match has been made.
          setTimeout(function () {
            turn1.src = 'image/0.png'
            turn2.src = 'image/0.png'

            turn1 = null
            turn2 = null
          }, 500)
        }
        if (pairs === (rows * cols) / 2) {
          // Timer that shows winning results after last tiles have been removed.
          setTimeout(function () {
            let winnerText = elementCreate.create('p', { id: 'winnertext' })
            winnerText.innerText = 'Winner!\n You used ' + tries + ' tries.'
            let div = document.querySelector('#memoryblock')
            div.insertBefore(winnerText, div.childNodes[0])
          }, 500)
        }
      }
    }
  }
  /**
 * Creates the tiles to a random order.
 *
 * @param {number} rows
 * @param {number} cols
 */
  createImgArray (rows, cols) {
    let imgArr = []

    for (let i = 1; i <= (rows * cols) / 2; i++) {
      imgArr.push(i)
      imgArr.push(i)
    }

    for (let i = imgArr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1))

      let temp = imgArr[i]
      imgArr[i] = imgArr[j]
      imgArr[j] = temp
    }
    return imgArr
  }
}
// Exports
export default MemoryGame
