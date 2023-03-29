__Step 1.__ Define the required variables used to track the state of the game
+ snake
  + position
    + arr of positions from grid
      + pos[0] is head
      + pos[-1] is tail
  + direction
    + str - 'up', 'right', __'down'__, or 'left'
  + length
    + init with value 3
  + speed
    + will increase as length increases
  + score
    + will increase as food is consumed
+ grid
  + length/width
  + size

__Step 2.__ Store cached element references
+ board
+ boxes
+ message


__Step 3.__ Upon loading, the game state should be initialized, and a function should be called to render this game state
+ define init() that resets snake, renders board, renders snake


__Step 4.__ The state of the game should be rendered to the user
+ define render() that generates the board

__Step 5.__ Define the required constants

__Step 6.__ Add listeners
+ Start Button

+ Reset Button

+ Handle a player controlling snake
  + arrow keys and WASD for desktop
  + swipe for mobile

__Step 7.__ Define Game Logic
+ collision detection
  + self
  + wall
  + food
+ growth with food

__Step 8.__ Create Reset functionality
+ gameover prompts message with a reset button
  + button will have a listener that calls reset()
  + reset() will reset all states of the game
