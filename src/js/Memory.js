
// really ugly temporary solution. FIX THIS>!!!
function createMemoryBase (puthere) {
  let memoryDiv = document.createElement('div')
  memoryDiv.setAttribute('id', 'memoryblock')

  let memoryTpl = document.createElement('template')
  memoryDiv.appendChild(memoryTpl)

  memoryTpl.innerHTML = `
            <div class="memory">
                <a href="#"><img src="image/0.png" alt="Memory brick" /></a>
            </div>
  `
  puthere.appendChild(memoryDiv)
}

/**
 * Create a memory game.
 * @param {number} rows
 * @param {number} cols
 * @param {*} container
 */
function createMemory (rows, cols, container) {
  let a
  let tiles = []
  let turn1
  let turn2
  let lastTile
  let pairs = 0
  let tries = 0

  tiles = createImgArray(rows, cols)

  container = document.getElementById('memoryblock')
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

    turnBrick(tiles[index], index, img)
  })

  container.appendChild(div)

  /**
   *
   * @param {number} tile
   * @param {number} index
   * @param {*} img
   */
  function turnBrick (tile, index, img) {
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
          container.insertBefore(winnerText, container.childNodes[0])
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
function createImgArray (rows, cols) {
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

// Exports
export default {
  createMemory,
  createImgArray,
  createMemoryBase
}
