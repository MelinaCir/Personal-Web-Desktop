/**
 * Class MemoryGame
 *
 * @author Melina Cirverius
 * @version 1.2
 */

class MemoryGame {
  constructor () {
    this.memoryDiv = document.createElement('div')
    this.memoryDiv.setAttribute('id', 'memoryblock')
    this.createMemoryBase()
  }

  createMemoryBase () {
    let memoryTpl = document.createElement('template')
    this.memoryDiv.appendChild(memoryTpl)

    memoryTpl.innerHTML = /* html */ `
              <div class="memory">
                  <a href="#"><img src="image/0.png" alt="Memory brick" /></a>
              </div>
    `
    this.createMemory(2, 3, memoryTpl)
  }

  createMemory (rows, cols, memdiv) {
    let a
    let tiles = []
    let turn1
    let turn2
    let lastTile
    let pairs = 0
    let tries = 0

    tiles = this.createImgArray(rows, cols)

    let templateDiv = memdiv.content.firstElementChild

    let div = document.importNode(templateDiv, false)

    tiles.forEach(function (tile, index) {
      a = document.importNode(templateDiv.firstElementChild, true)

      a.firstElementChild.setAttribute('data-bricknumber', index)

      div.appendChild(a)

      if ((index + 1) % cols === 0) {
        div.appendChild(document.createElement('br'))
      }
    })

    // div.addEventListener('click', function (event) {
    //   event.preventDefault()
    //   let img = event.target.nodeName === 'IMG' ? event.target : event.target.firstElementChild
    //   let index = parseInt(img.getAttribute('data-bricknumber'))
    //   this.turnBrick(tiles[index], img, rows, cols)
    // })

    div.addEventListener('click', event => turnBrick(event))

    this.memoryDiv.appendChild(div)

    // prepareBricks (event, tiles, rows, cols) {
    //   event.preventDefault()

    //   let img = event.target.nodeName === 'IMG' ? event.target : event.target.firstElementChild
    //   let index = parseInt(img.getAttribute('data-bricknumber'))

    //   this.turnBrick(tiles, index, img, rows, cols)
    // }

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
            let div = document.querySelector('#memoryblock')
            console.log(div)
            div.insertBefore(winnerText, div.childNodes[0])
          }, 500)
        }
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

export default MemoryGame
