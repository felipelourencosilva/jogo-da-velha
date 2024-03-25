let gameArray = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
]

// Symbol 1 = "X"
// Symbol 2 = "O"
// Symbol 3 = "Draw"

let symbol = 2
let XWins = 0
let OWins = 0

function playGame(boxNum) {
  resultText = document.getElementById('result')
  resultText.textContent = ''

  let [x, y] = boxNum.split('')

  if (gameArray[x][y] === 0) {
    symbol === 1 ? (symbol = 2) : (symbol = 1)
    gameArray[x][y] = symbol

    const symbolHTML = (document.createElement('p').textContent = `${
      symbol === 1 ? 'X' : 'O'
    }`)
    document.getElementById(boxNum).append(symbolHTML)

    if (checkResult()) {
      switch (checkResult()) {
        case 1:
          resultText.textContent = '"X" GANHOU! ✅🎉🎉🎉'
          XWins++
          break
        case 2:
          resultText.textContent = '"O" GANHOU! ✅🎉🎉🎉'
          OWins++
          break
        case 3:
          resultText.textContent = 'O JOGO EMPATOU!'
          break
      }

      setTimeout(() => {
        resultText.textContent = ''
        let boxes = document.querySelectorAll('.box')
        boxes.forEach(box => {
          if (box.hasChildNodes()) {
            box.removeChild(box.firstChild)
          }
        })
        gameArray = [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0]
        ]

        symbol = 2
      }, 1000)

      let XScore = document.getElementById('x-score')
      XScore.textContent = `X = ${XWins}`
      let OScore = document.getElementById('o-score')
      OScore.textContent = `O = ${OWins}`

      if (XWins > OWins) {
        XScore.style.border = '3px solid hsl(135, 100%, 75%)'
        OScore.style.border = '3px solid hsl(0, 0%, 60%)'
      } else if(OWins > XWins){
        OScore.style.border = '3px solid hsl(135, 100%, 75%)'
        XScore.style.border = '3px solid hsl(0, 0%, 60%)'
      } else {
        XScore.style.border = '3px solid hsl(0, 0%, 60%)'
        OScore.style.border = '3px solid hsl(0, 0%, 60%)'
      }
    }
  }
}

// function that check if the player won, lost or drew
function checkResult() {
  // checking by lines
  for (let line = 0; line < 3; line++) {
    const lineSet = new Set()
    for (let column = 0; column < 3; column++) {
      lineSet.add(gameArray[line][column])
    }

    if (lineSet.size === 1 && !lineSet.has(0)) {
      return lineSet.has(1) ? 1 : 2
    }
  }

  // checking by columns
  for (let column = 0; column < 3; column++) {
    const columnSet = new Set()
    for (let line = 0; line < 3; line++) {
      columnSet.add(gameArray[line][column])
    }

    if (columnSet.size === 1 && !columnSet.has(0)) {
      return columnSet.has(1) ? 1 : 2
    }
  }

  // checking diagonals
  const mainDiagonalSet = new Set([
    gameArray[0][0],
    gameArray[1][1],
    gameArray[2][2]
  ])
  if (mainDiagonalSet.size === 1 && !mainDiagonalSet.has(0)) {
    return mainDiagonalSet.has(1) ? 1 : 2
  }

  const antiDiagonalSet = new Set([
    gameArray[0][2],
    gameArray[1][1],
    gameArray[2][0]
  ])
  if (antiDiagonalSet.size === 1 && !antiDiagonalSet.has(0)) {
    return antiDiagonalSet.has(1) ? 1 : 2
  }

  // checking for draw
  if (
    !gameArray[0].includes(0) &&
    !gameArray[1].includes(0) &&
    !gameArray[2].includes(0)
  ) {
    return 3
  }

  return false
}
