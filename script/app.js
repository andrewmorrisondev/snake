/*-------------------------------- Constants --------------------------------*/

const grid = {
  lengthAndWidth: 20,
  size: 20 * 20
}

const highScore = 67

const snake = {
  position: [86, 66, 46, 26],
  direction: `down`,
  length: 3,
  speed: 100,
  score: 0,
  eat: () => {
    ++snake.length,
    ++snake.score,
    snake.speed -= 0.2,
    playConsume(),
    updateScore()
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
    snakeMoving,
    keyDown = false, 
    tick = null,
    audio = false

/*------------------------ Cached Element References ------------------------*/

const score = document.querySelector(`.score`)
const currentScore = document.querySelector(`#current-score-display`)
const highScoreEL = document.querySelector(`#high-score-display`)
const board = document.querySelector(`.board`)
const message = document.querySelector(`.start-message`)
const ggMessage = document.querySelector(`.gg-message`)
const mobileControls = document.querySelector(`.mobile-controls`)
const doNot = document.querySelector(`.do-not-press`)
const hello = document.querySelector(`.hello`)

const controlsL = document.querySelector(`#L`)
const controlsR = document.querySelector(`#R`)
const controlsU = document.querySelector(`#U`)
const controlsD = document.querySelector(`#D`)

/*----------------------------- Event Listeners -----------------------------*/

document.addEventListener(`keydown`, (event) => {
  buttonAnimationOn(event.key)
})
document.addEventListener(`keyup`, (event) => {
  buttonAnimationOff(event.key)
})

// doNot.addEventListener(`mouseover`, () => {
//   document.querySelector(`#do-not-press`).classList.remove(`hidden`)
// })

// doNot.addEventListener(`mouseout`, () => {
//   document.querySelector(`#do-not-press`).classList.add(`hidden`)
// })

doNot.addEventListener(`click`, () => {
  youPressed()
})

hello.addEventListener(`mouseover`, () => {
  document.querySelector(`#hello`).classList.remove(`hidden`)
})

hello.addEventListener(`mouseout`, () => {
  document.querySelector(`#hello`).classList.add(`hidden`)
})

hello.addEventListener(`click`, () => {
  console.log(`hello`)
  playHello()
  audio = !audio
})

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
  if (event.key === ` `) {
    if (gameover) {
      newGame()
    } else if (!snakeMoving){
      displayHide()
      startSnake()
    }
  }
})

document.addEventListener(`click`, (event) => {
  if (event.target.id === `play`) {
    displayHide()
    startSnake()
  }
  if (event.target.id === `play-again`) {
    newGame()
  }
})

// buttons for mobile
document.addEventListener(`click`, (event) => {
  if (snake.direction === `left` || snake.direction === `right`) {
    if (event.target.parentElement.id === `U`) {
      snake.direction = `up`
    }
    if (event.target.parentElement.id === `D`) {
      snake.direction = `down`
    }
  }
  if (snake.direction === `up` || snake.direction === `down`) {
    if (event.target.parentElement.id === `L`) {
      snake.direction = `left`
    }
    if (event.target.parentElement.id === `R`) {
      snake.direction = `right`
    }
  }
})

controlsL.addEventListener(`click`, () => {
  if (snake.direction === `up` || snake.direction === `down`) {
    snake.direction = `left`
  }
})
controlsR.addEventListener(`click`, () => {
  if (snake.direction === `up` || snake.direction === `down`) {
    snake.direction = `right`
  }
})
controlsU.addEventListener(`click`, () => {
  if (snake.direction === `left` || snake.direction === `right`) {
    snake.direction = `up`
  }
})
controlsD.addEventListener(`click`, () => {
  if (snake.direction === `left` || snake.direction === `right`) {
    snake.direction = `down`
  }
})


/*-------------------------------- Functions --------------------------------*/

// stops animations on load
setTimeout( () => {
  document.body.classList.remove('preload');
},2000)

function updateScore() {
  currentScore.innerText = parseInt(snake.score)
}

function renderHighScore() {
  highScoreEL.innerText = highScore
}

function playCollide() {
  if (audio) {
    const collideByte = new Audio(`/assets/sounds/collide.wav`)
    collideByte.volume = 0.4
    collideByte.play()
  } 
}

function playConsume() {
  if (audio) {
    const consumeByte = new Audio(`/assets/sounds/consume.wav`)
    consumeByte.volume = 0.4
    consumeByte.play()
  }
}

function playHello() {
  const helloByte = new Audio(`/assets/sounds/hello.mp3`)
  helloByte.volume = 0.2
  helloByte.play()
}

function youPressed() {
  alert(`you can't get mad at me for using this alert becuase I was pretty clear about not pressing that button`)
}

function buttonAnimationOn(id) {
  if (!id === ` `) {
    document.querySelector(`#${id}`).classList.remove(`hidden`)
  }
}

function buttonAnimationOff(id) {
  if (!id === ` `) {
    document.querySelector(`#${id}`).classList.add(`hidden`)
  }
}

function displayStart() {
  message.classList.remove(`hidden`)
}

function displayLose() {
  score.innerText = `score: ${snake.score}`
  ggMessage.classList.remove(`hidden`)
}

function displayHide() {
  message.classList.add(`hidden`)
  ggMessage.classList.add(`hidden`)
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
  displayHide()
  updateScore()
  startSnake()
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
  snakeMoving = true
}

function stopSnake() {
  clearInterval(tick)
  snakeMoving = false
}

function speedUp() {
  clearInterval(tick)
  tick = setInterval(renderSnake, snake.speed)
}

function foodCollide() {
  if (board.childNodes[snake.position[0]].classList.contains(`food`)) {
    board.childNodes[snake.position[0]].classList.remove(`food`)
    snake.eat()
    spawnFood()
    speedUp()
  }
}

function tailCollide() {
  if (board.childNodes[snake.position[0]].classList.contains(`snake`)) {
    playCollide()
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
  if (snake.position[0] > grid.size - 1) {
    return true
  }
  return false
}

function rightWallCollide() {
  if (snake.position[0] % grid.lengthAndWidth === 0 && snake.direction === `right`) {
    return true
  }
  return false
}

function leftWallCollide() {
  if (snake.position[0] % grid.lengthAndWidth === 19 && snake.direction === `left`) {
    return true
  }
  return false
}

function wallCollide() {
  if (topWallCollide() || bottomWallCollide() || leftWallCollide() || rightWallCollide()) {
    playCollide()
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
  if (board.childNodes[foodPos].classList.contains(`snake`) || 
      board.childNodes[foodPos].classList.contains(`snake-head`)) {
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
  renderHighScore()
  spawnFood()
  displayStart()
}
          
init()