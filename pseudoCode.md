Step 1. Define the required variables used to track the state of the game
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

Step 2. Store cached element references
+ board
+ boxes
+ message


Step 3. Upon loading, the game state should be initialized, and a function should be called to render this game state
+ define init() that resets snake, renders board, renders snake


Step 4. The state of the game should be rendered to the user
+ define render() that generates the board

Step 5. Define the required constants

Step 6. Add listeners
+ Start Button

+ Reset Button

+ Handle a player controlling snake
  + arrow keys and WASD for desktop
  + swipe for mobile

Step 7. Define Game Logic
+ collision detection
  + self
  + wall
  + food
+ growth with food

Step 8. Create Reset functionality
+ gameover prompts message with a reset button
  + button will have a listener that calls reset()
  + reset() will reset all states of the game
