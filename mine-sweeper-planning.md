MINE SWEEPER

### Recursion

Is a mathematical based function that uses itself to determine the next value. Within programming this can be represented with an array that calls previous indexes to determine the value of the current index.

FIB(I) = FIB(I-1) + FIB(I-2)

JS:
const fib = [0 , 1]
const x = //how ever many recursions you want to do

for (let i = 2; i < x; i++){
    fib[i] = fib[i-1] + fib[i-2]
    console.log(fib[i])
}

### Floodfill

Is an algorithm that in a given area (in this case a 2D array) with a defined starting point, fills areas adjacent to it until a condition is met.

    // Make decision on most effective one based on board size options:
        - to review:
            recursive (I am assuming this is why we needed to understand recursion)
            stack
            queue
            span

### Mine Sweeper General Rules

Player is presented with a grid based board (I will be doing medium diffulty setting of 16x16 grid). Each cell is currently hidden and the objective is to find all the mines within the space.
Players can use either click which determines functionality.
Left Click - used on cells the player believes to contain no mines
    - This will then reveal the contents of the cell. There are two outcomes:
        - Death, player dies and can reset
        - Player lives, revealing information on the board. There are two outcomes here:
            -Cells with adjacent(the 8 surrounding directions in a 2d grid layout) mines
                -This cell displays a number which represents the number of mines around it
            -Cells without adjacent mines
                - Continues to reveal cells until adjacent mines are hit. 
            -Revealing stops once cells with adjacent mines have been hit           
Right Click - used on cells the player believes to conatain a mine
    - On click a flag is placed on this cell
        -If cell already has a flag, it is then removed and added back to the flag inventory

### User Stories

1. As a player I want to be able to start a game
    1. a. Potential added functionality - Grid Size button & Difficulty button
2. As a player I want to see how many mines there are in the board
3. As a player I want to see how many moves I have made
4. As a player I want to be able to interact with the board through left-click & right-click
    4. Right-Click: As a player I want to be able to add flags to cells that I think contain mines and remove flags from cells that already contain flags.
    4. Left-Click: As a player I want to be able to click on cells I believe doesnt contain mines to reveal more information about the board
5. As a player I want the board to display infomation in cells that I have clicked, and reveal continue to reveal empty cells until a cell with an adjacent mine is hit. I then want to see a number in this cell representing the number of adjacent mines.
6. As a player I want the following end game conditions:
    ON WIN:
    1. I want a message shown saying how many moves I made.
    2. I want the option to reset.
    ON Death:
    1. I want to see all mines on the board.
    2. Correctly and incorrectly placed flags (If any).
    3. I want the option to reset.

### Psuedo Code

# Data Structure:

Board[15][15] //representing the 16x16 grid

# Variables:

moveCount = int
mineCount = int
deathCondition = boolean

# Dom Elements:

bsquares
resetBtn
moves
mines

# Event Listeners:

bsqaures (left & right click)
resetBtn

# Functions:

init(){
    -reset variables
    -reset html id based styling
    -call placeMines
    -call adjacentMines
    -call render
}

render(){
    -call revealBoard if death condition is met
    -call updateBoard
}

placeMines(){
    -random number generator to place mines randomly in the array
}

adjacentMines(){
    - Recusive algorthim that deterimines its value based on the array of [0 || +/-1][0 || +/- 1] indexs to return its own value
}

addRemoveFlag(){
    - changes the value of the index clicked to the flag value
    - removes flag value if already clicked
    //Things to explore - how to represent in the data structure. The removing of a flag on a bomb square has to reset its original value
        //Could create two arrays one for flag placement and one for mines then equating the two indexs to check for correct flags
}

leftClick(){
    - check death condition (if mine in clicked square)
    - check adjacent condition (if square adjacent has a mine)
    - Flood fill algo if neither of the two conditions above are met
}

deathCondition(){
    -checks current click for mine and fulfillment of the death condition
}

revealBoard(){
    -reveals board on deathCondition = True
        - shows correctly placed flags
        - incorrectly placed flags
        - unfound mines
        - the mine that killed you
    -otherwise floodfill
}

winCondition(){
    - checks for win condition
    - displays win message
}

updateBoard(){
    -updates board display visually
        - I plan to use a number of CSS classes to change the appearance of the board based on addin/removing ids/classes
    -reference changes made through moveCounter() & mineCounter() and update display
    -checks for win/lose condtion and displays message accordingly
}

onClick(){
    - Left/right click if statement
        -left
            - leftclick
        -right
            - call placeFlag
            - call winCondition
}

moveCounter(){
    - iterate on left-click
}

bombCounter(){
    - negatively iterate on right-click
}