/*-------------------------------- Constants --------------------------------*/
const board = []

//Building the array that based on difficulty
// const easyWidthHeight = 10
const mediumWidthHeight = 16
// const hardWidth = 24
// const hardHeight = 16
// const hard = hardWidth * hardHeight 

// Number of mines per difficulty
// const numOfMinesEasy = 10
const numOfMinesMedium = 40
// const numOfMinesHard = 99

/*---------------------------- Variables (state) ----------------------------*/
let moves = 0
let deathCondition = false
let flagCounter = numOfMinesMedium

/*------------------------ Cached Element References ------------------------*/
const grid = document.querySelector('.grid')
console.dir(grid)
// const cell = document.querySelectorAll('.sqr')
// console.dir(cell)
const reset = document.querySelector('.reset')
console.dir(reset)
const flagCounterEl = document.querySelector('.flagCounter')
console.dir(flagCounter)
const moveCounterEl = document.querySelector('.moveCounter')
console.dir(moveCounter)

/*-------------------------------- Functions --------------------------------*/
// function init(){

// }
// function render(){

// }


//build the array representing the board
function buildBoardArray(){
    for(let i = 0; i < mediumWidthHeight**2; i++)
        board[i] = ' '
}
buildBoardArray()
// console.log(board)

//randomly place mines in the board array
function placeMines(){
    for (let i = 0; i < numOfMinesMedium; i++){
        let j = Math.floor(Math.random() * board.length)
        while(board[j] !== ' '){
            j = Math.floor(Math.random() * board.length)
        }
        // console.log(`i: ${i} j: ${j}`)
        // console.log(`i: ${i} j: ${k}`)
        board[j] = 'X'
    }
    // console.log(board)
}
placeMines()

//calculate the number of adjacent mines to a square
function adjacentMines(){
    board.forEach((sqr, i) => {
        let mineCount = 0
        if(board[i] !== 'X'){    
            if(i % 16 !== 0 && board[i-17] === 'X'){
                mineCount++
            }
            if(board[i-16] === 'X'){
                mineCount++
            }
            if(i % 16 !== 15 && board[i-15] === 'X'){
                mineCount++
            }
            if(i % 16 !== 0 && board[i-1] === 'X'){
                mineCount++
            }
            if(i % 16 !== 15 && board[i+1] === 'X'){
                mineCount++
            }
            if(i !== 0 && i % 16 !== 0 && board[i+15] === 'X'){
                mineCount++
            }
            if(board[i+16] === 'X'){
                mineCount++
            }
            if(i % 16 !== 15 && board[i+17] === 'X'){
                mineCount++
            }
            if(mineCount > 0){
                board[i] = mineCount
            }
        }
    })
}
//adjacentMines()

//update the move counter on the UI
function moveCounter(){
    moveCounterEl.innerText = moves
}
// moveCounter()

//update the mine/flag counter on the UI
function mineCounter(){
    flagCounterEl.innerText = flagCounter 
}
// mineCounter()

//floodfill for clicked sqaure
function flood(){
    console.log('floodfill sim')
}

//dynamically build the board & event listener for left and right clicks
function buildBoard(){
    board.forEach((sqr, i) =>{
        const square = document.createElement('div')
        square.innerText = board[i]
        // console.log(board)
        square.classList.add('sqr')
        square.id = i
        grid.appendChild(square)
        adjacentMines()
        mineCounter()
        moveCounter()
        square.addEventListener('click', leftClick)
        square.addEventListener('contextmenu', rightClick)
        function rightClick(event){
            event.preventDefault()
            console.log('right')
            if(square.classList.contains('flag')){
                square.classList.remove('flag')
                flagCounter++
                mineCounter()
            }else{
                square.classList.add('flag')
                flagCounter--
                mineCounter()
            }
        }
        function leftClick(){
            let idx = square.getAttribute('id')
            parseInt(idx)
            if(board[idx] === 'X'){
                console.log('you are dead')
                moves++
                moveCounter() // probably not needed later
            }else if(square.classList.contains('flag')){
                //do nothing
            }else{
                flood()
                moves++
                moveCounter() //probably not needed later
            }
        }     
    })
}
buildBoard()

// init()
/*----------------------------- Event Listeners -----------------------------*/

// cell.forEach((sqr) =>{
//     sqr.addEventListener('click', leftClick)
//     sqr.addEventListener('oncontextmenu', rightClick)
// })