# tic-tac-toe
the odin project

# What I need
## Board class
  - Draw Board
    draw 3x3 grid
  - Place piece
  - Check winner
## Player class
  - Winner status
  - piece
  - turn
  - place piece
## Game class

# Chapter 1: Board
Board class will handle all the necessary methods and variables needed to appropriately display the board
to the user
```
   1 | 2 | 3   how 
  ---+---+---  do i
   4 | 5 | 6   make this
  ---+---+---  in code?
   7 | 8 | 9
```
My idea was to create a static board, each cell (or element) from 1 to 9 is interpolated hence can be changed. I will create an array of size 9 to access each element.
# Chapter 2: Game and Player
Game class will handle all the necessary methods and variables for the game to run.
This includes creating player 1 and player 2, whose turn is it, if there is a winner already, etc.

I'm having a hard time deciding where to put a method called `play`. This method will run in loop until there is a winner. Should I define it in game, use it in game like a class/private method? or should I invoke it outside so that I have more flexibility. Flexibility on what? I don't know. 

# Chapter 3: Winner
Every chapter is me trying to solve a particlar barrier. This time, it's determining if there's a winner. And if there is, then who is it? I solved the first one by initializing an array containing all the winning lines, iterate over all of it and check if my current board contains one. If there is, then we have a winner. We have a winner, but how do we know who is it? My winner? method will return true if either player1 or player2 has a winning line. If I decide to make two separate checks for each player, then I reckon my method will double in line. Another thing my method do is to populate an array of the three characters that exists in the index in the winning line. I think this calls for an example.

Say I have the winning line [0, 1, 2]. This is the current line in the iteration. I will then check, in my board, the indeces 0, 1, 2. I will push the elements in indeces 0, 1, and 2 to another array. If, for example, the new array consists of ["X", "X", "O"] then we already don't have a winner, because I'm calling all? which means all of the elements in the array must be true for it to be true. If we have ["X", "X", "X"] but the player characters are "0" and "A", we still don't have a winner. Finally, if we have ["0", "0", "0"] and player one character is "0", then we have a winner. But that does not necessarily mean the code knows it's player one. The array could also be ["A", "A", "A"] and still return true. Simply put, the winner? will return true if either player1 or player2 has a winning line.

Now, to know which is the winner, I could simply add another ternary line