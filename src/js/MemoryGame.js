class MemoryGame {
  constructor () {
    this.container = ''
    this.createMemoryBase()
  }
  // Creates the base for the game by
  // creating the main div for the game
  // and creating the template for the cards
  createMemoryBase () {
    // main div for game
    let memoryDiv = document.createElement('div')
    memoryDiv.setAttribute('id', 'memoryblock')

    // card template
    let memoryTpl = document.createElement('template')
    memoryDiv.appendChild(memoryTpl)

    memoryTpl.innerHTML = /* html */ `
              <div class="memory">
                  <a href="#"><img src="image/0.png" alt="Memory brick" /></a>
              </div>
    `
  }

  createMemory (rows, cols) {
    let a
    let tiles = []

    tiles = this.createImgArray(rows, cols)

    this.container = document.getElementById('memoryblock')
    var templateDiv = document.querySelectorAll('#memoryblock template')[0].content.firstElementChild

    let div = document.importNode(templateDiv, false)

    tiles.forEach(function (tile, index) {
      a = document.importNode(templateDiv.firstElementChild, true)

      a.firstElementChild.setAttribute('data-bricknumber', index)

      div.appendChild(a)

      if ((index + 1) % cols === 0) {
        div.appendChild(document.createElement('br'))
      }
    })

    div.addEventListener('click', function (event) {
      event.preventDefault()
      let img = event.target.nodeName === 'IMG' ? event.target : event.target.firstElementChild

      let index = parseInt(img.getAttribute('data-bricknumber'))

      this.turnBrick(tiles[index], index, img, rows, cols)
    })

    this.container.appendChild(div)
  }
  /**
     *
     * @param {number} tile
     * @param {number} index
     * @param {*} img
     */
  turnBrick (tile, index, img, rows, cols) {
    let turn1
    let turn2
    let lastTile
    let pairs = 0
    let tries = 0

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

        setTimeout(function () {
          turn1.parentNode.classList.add('removed')
          turn2.parentNode.classList.add('removed')

          turn1 = null
          turn2 = null
        }, 300)
      } else {
        setTimeout(function () {
          turn1.src = 'image/0.png'
          turn2.src = 'image/0.png'

          turn1 = null
          turn2 = null
        }, 500)
      }
      if (pairs === (rows * cols) / 2) {
        setTimeout(function () {
          let winnerText = document.createElement('p')
          winnerText.setAttribute('id', 'winnertext')
          winnerText.innerText = 'Winner!\n You used ' + tries + ' tries.'
          this.container.insertBefore(winnerText, this.container.childNodes[0])
        }, 500)
      }
    }
  }

  /**
 *
 * @param {*} rows
 * @param {*} cols
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

export default{
  MemoryGame
}