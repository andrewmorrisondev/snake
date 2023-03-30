/*-------------------------------- Constants --------------------------------*/

const grid = {
  lengthAndWidth: 20,
  size: 20 * 20
}


/*---------------------------- Variables (state) ----------------------------*/

let snake = {
  position: [86, 66, 46, 26],
  direction: `down`,
  length: 3,
  speed: 100,
  score: 0,
  eat: () => {
    ++snake.length,
    ++snake.score,
    snake.speed += 100
  },
  reset: () => {
    snake.position = [86, 66, 46, 26],
    snake.direction = `down`,
    snake.length = 3,
    snake.speed = 100,
    snake.score = 0
  }
}

let gameover, tick = null

/*------------------------ Cached Element References ------------------------*/

const board = document.querySelector(`.board`)
const boxes = document.querySelectorAll(`.box`)
const message = document.querySelector(`.message`)

/*----------------------------- Event Listeners -----------------------------*/

document.addEventListener(`keypress`, (event) => {
  if (event.key === `w`) {
    snake.direction = `up`
  }
  if (event.key === `a`) {
    snake.direction = `left`
  }
  if (event.key === `s`) {
    snake.direction = `down`
  }
  if (event.key === `d`) {
    snake.direction = `right`
  }
  if (event.key === ` `) {
    startSnake()
  }
})

/*-------------------------------- Functions --------------------------------*/


function renderBoard() {
  for (i = 0; i < grid.size; i++) {
    const box = document.createElement(`div`)
    box.setAttribute(`class`, `box`)
    board.appendChild(box)
  }
}

function drawForward() {
  snake.position.forEach((pos) => {
    board.childNodes[pos].classList.add(`snake`)
  })
}

function eraseBackward() {
  if (snake.position.length > snake.length) {
    const trail = snake.position.pop()
    board.childNodes[trail].classList.remove(`snake`)
  }
}

function renderSnake() {
  moveHead()
  if (gameover === false) {
    drawForward()
  }
}

function startSnake() {
  tick = setInterval(renderSnake, snake.speed)
}

function stopSnake() {
  clearInterval(tick)
}

function foodCollide() {
  if (board.childNodes[snake.position[0]].classList.contains(`food`)) {
    // remove food
    board.childNodes[snake.position[0]].classList.remove(`food`)
    // increase lenghth
    snake.eat()
    // spawn new food
    spawnFood()
  }
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

function tailCollide() {
  if (board.nodeList[snake.position[0]].classList.contains(`snake`)) {
    return true
  }
  return false
}


function gg() {
  gameover = true
  message.innerText = `game over ${snake.score}`
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

  // tailCollide()
  if (wallCollide()) {
    stopSnake()
    gg()
  } else {
    foodCollide()
    eraseBackward()
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
  snake.reset
  renderBoard()
  renderSnake()
  spawnFood()
}
          
init()
          