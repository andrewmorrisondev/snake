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
    ++snake.length
  },
  reset: () => {
    snake.position = [86, 66, 46, 26],
    snake.direction = `down`,
    snake.length = 3,
    snake.speed = 100,
    snake.score = 0
  }
}

/*------------------------ Cached Element References ------------------------*/

const board = document.querySelector(`.board`)
const boxes = document.querySelectorAll(`.box`)

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
  drawForward()
}

function startSnake() {
  setInterval(renderSnake, snake.speed)
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
  foodCollide()
  eraseBackward()
}

function spawnFood() {
  const foodPos = Math.floor(Math.random() * 399)
  board.childNodes[foodPos].classList.add(`food`)
}

function init() {
  snake.reset
  renderBoard()
  renderSnake()
  spawnFood()
}
          
init()
          