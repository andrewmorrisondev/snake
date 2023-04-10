# [Play Snake](https://ssssnake.netlify.app)

<!-- #### a description of snake, why I chose it, and a screenshot -->
Snake is a classic arcade game, reprogrammed in 1997 by Taneli Armanto of Nokia for the Nokia 6110. I chose to build Snake because I like playing it. The __theme__ of this project will honor the original, but take liberties where appropriate (or fun).

![start screen](https://i.imgur.com/0jaVWGL.png)

<!-- # How to Play -->
## Controls

- Spacebar - begin a new game.
- WASD - change the snake's direction.

## High Score
Ivan Jukic - 67

## Technologies

* JS
* CSS
* HTML
* Git
* Pixelmator Pro
* Netlify

## Upcoming Features - Icebox

[X] - A gameboard made up of a grid

[X] - A snake that can move around the grid with WASD

[X] - Randomly spawning food that can be consumed

[X] - Consuming food makes the snake longer

[X] - Speed increases as the snake grows

[X] - Collision detection

[X] - Accessibility for mobile users

[X] - Scoreboard

~~[ ] - Leaderboard~~ 

[X] - Sound effects

[X] - Fix window size

[X] - Easter eggs

~~[ ] - Cheat codes~~

[X] - Reconnect mobile buttons

[X] - Fix button animations

## Highlights from `app.js`

### The Snake Object
``` 
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
```
### Snake Tail
```
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
```

### Render Board
```
function renderBoard() {
  for (i = 0; i < grid.size; i++) {
    const box = document.createElement(`div`)
    box.setAttribute(`class`, `box`)
    board.appendChild(box)
  }
}
```

## Wireframe

![wireframe01](https://i.imgur.com/4DYTRVW.png)
![wireframe02](https://i.imgur.com/vXAY1bN.png)

## Attributions

* [Josh's Custom CSS Reset](https://www.joshwcomeau.com/css/custom-css-reset/)
* [Prevent Animations on Page Load](https://stackoverflow.com/questions/27938900/how-to-prevent-a-css-keyframe-animation-from-running-on-page-load)
* [VT323 - Google Font](https://fonts.google.com/share?selection.family=VT323)