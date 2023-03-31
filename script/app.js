/*-------------------------------- Constants --------------------------------*/

const grid = {
  lengthAndWidth: 20,
  size: 20 * 20
}


const snake = {
  position: [86, 66, 46, 26],
  direction: `down`,
  length: 3,
  speed: 100,
  score: 0,
  eat: () => {
    ++snake.length,
    ++snake.score,
    snake.speed -= 0.2
  },
  reset: () => {
    snake.position = [86, 66, 46, 26],
    snake.direction = `down`,
    snake.length = 3,
    snake.speed = 100,
    snake.score = 0
  }
}
/*---------------------------- Variables (state) ----------------------------*/

let gameover, 
    keyDown = false, 
    tick = null

/*------------------------ Cached Element References ------------------------*/

const board = document.querySelector(`.board`)
const message = document.querySelector(`.message`)
const mobileControls = document.querySelector(`.mobile-controls`)

/*----------------------------- Event Listeners -----------------------------*/

document.addEventListener(`keypress`, (event) => {
  if (!keyDown) {
    if (snake.direction === `left` || snake.direction === `right`) {
      if (event.key === `w`) {
        snake.direction = `up`
        keyDown = true
      }
      if (event.key === `s`) {
        snake.direction = `down`
        keyDown = true
      }
    }
    if (snake.direction === `up` || snake.direction === `down`) {
      if (event.key === `a`) {
        snake.direction = `left`
        keyDown = true
      }
      if (event.key === `d`) {
        snake.direction = `right`
        keyDown = true
      }
    }
  }
  console.clear()
  console.log(event.key)
})

document.addEventListener(`click`, (event) => {
  if (event.target.textContent === `play`) {
    displayHide()
    startSnake()
  }
  if (event.target.textContent === `play again?`) {
    newGame()
    displayHide()
    startSnake()
  }
})

// buttons for mobile
document.addEventListener(`click`, (event) => {
  if (snake.direction === `left` || snake.direction === `right`) {
    if (event.target.id === `u`) {
      snake.direction = `up`
    }
    if (event.target.id === `d`) {
      snake.direction = `down`
    }
  }
  if (snake.direction === `up` || snake.direction === `down`) {
    if (event.target.id === `l`) {
      snake.direction = `left`
    }
    if (event.target.id === `r`) {
      snake.direction = `right`
    }
  }
})



/*-------------------------------- Functions --------------------------------*/

function displayStart() {
  const play = document.createElement(`div`)
  play.classList.add(`play`)
  play.innerText = `play`
  message.appendChild(play)
}

function displayLose() {
  message.removeChild(message.firstChild)

  const playAgain = document.createElement(`div`)
  playAgain.classList.add(`play-again`)
  playAgain.innerText = `play again?`
  message.appendChild(playAgain)

  message.classList.remove(`hidden`)
}

function displayHide() {
  message.classList.add(`hidden`)
}

function renderBoard() {
  for (i = 0; i < grid.size; i++) {
    const box = document.createElement(`div`)
    box.setAttribute(`class`, `box`)
    board.appendChild(box)
  }
}

function resetBoard() {
  const boxes = document.querySelectorAll(`.box`)

  for (const box of boxes) {
    box.className = `box`
  }
}

function newGame() {
  gameover = false
  resetBoard()
  spawnFood()
  snake.reset()
}

function drawForward() {
  snake.position.forEach((pos) => {
    board.childNodes[pos].classList.add(`snake`)
  })
  board.childNodes[snake.position[0]].classList.remove(`snake`)
  board.childNodes[snake.position[0]].classList.add(`snake-head`)
}

function eraseBackward() {
  if (snake.position.length > snake.length) {
    const trail = snake.position.pop()
    board.childNodes[trail].classList.remove(`snake`)
  }
  board.childNodes[snake.position[1]].classList.remove(`snake-head`)
}

function startSnake() {
  tick = setInterval(renderSnake, snake.speed)
}

function stopSnake() {
  clearInterval(tick)
}

function speedUp() {
  clearInterval(tick)
  tick = setInterval(renderSnake, snake.speed)
}

function foodCollide() {
  if (board.childNodes[snake.position[0]].classList.contains(`food`)) {
    // remove food
    board.childNodes[snake.position[0]].classList.remove(`food`)
    // increase lenghth
    snake.eat()
    // spawn new food
    spawnFood()
    speedUp()
    console.log(snake.speed);
  }
}

function tailCollide() {
  if (board.childNodes[snake.position[0]].classList.contains(`snake`)) {
    return true
  }
  return false
}

function topWallCollide() {
  if (snake.position[0] < 0) {
    return true
  }
  return false
}

function bottomWallCollide() {
  if (snake.position[0] > 399) {
    return true
  }
  return false
}

function rightWallCollide() {
  if (snake.position[0] % 20 === 0 && snake.direction === `right`) {
    return true
  }
  return false
}

function leftWallCollide() {
  if (snake.position[0] % 20 === 19 && snake.direction === `left`) {
    return true
  }
  return false
}

function wallCollide() {
  if (topWallCollide() || bottomWallCollide() || leftWallCollide() || rightWallCollide()) {
    return true
  }
  return false
}

function gg() {
  gameover = true
  displayLose()
}

function moveHead() {
  switch(snake.direction) {
    case 'up':
      snake.position.unshift(snake.position[0] - grid.lengthAndWidth)
      break;
    case 'left':
      snake.position.unshift(snake.position[0] - 1)
      break;
    case 'down':
      snake.position.unshift(snake.position[0] + grid.lengthAndWidth)
      break;
    case 'right':
      snake.position.unshift(snake.position[0] + 1)
      break;
  }
  keyDown = false
  if (wallCollide() || tailCollide()) {
    stopSnake()
    gg()
  } else {
    foodCollide()
    eraseBackward()
  }
}

function renderSnake() {
  moveHead()
  if (gameover === false) {
    drawForward()
  }
}

function spawnFood() {
  const foodPos = Math.floor(Math.random() * grid.size)
  if (board.childNodes[foodPos].classList.contains(`snake`)) {
    spawnFood()
  } else {
    board.childNodes[foodPos].classList.add(`food`)
  }
}

function init() {
  gameover = false
  snake.reset()
  renderBoard()
  renderSnake()
  spawnFood()
  displayStart()
}
          
init()