/*-------------------------------- Constants --------------------------------*/
let board = []
let visitedCell = []

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
let moves 
let deathCondition 
let flagCounter 

/*------------------------ Cached Element References ------------------------*/
const grid = document.querySelector('.grid')
console.dir(grid)
// const cell = document.querySelectorAll('.sqr')
// console.dir(cell)
const resetEl = document.querySelector('.reset')
console.dir(resetEl)
const flagCounterEl = document.querySelector('.flagCounter')
console.dir(flagCounter)
const moveCounterEl = document.querySelector('.moveCounter')
console.dir(moveCounter)

/*-------------------------------- Functions --------------------------------*/
function init(){
    board = []
    visitedCell = []
    moves = 0
    deathCondition = false
    flagCounter = numOfMinesMedium
    
    buildBoardArray()
    placeMines()
    adjacentMines()
    
}

function render(){
    buildBoard()
}

function checkWin(){
    board.forEach((e , i) => {
        let x = document.getElementById(i)
        let count = 0
        if(x.classList.contains('flag') && x.classList.contains('mine')){
            count++
        }
        if(count === numOfMinesMedium){
            //display win message
            console.log('you win!')
        }
        //console.log('testinging win')
    })
    //let x = document.getElementById(idx)
}

//build the array representing the board
function buildBoardArray(){
    for(let i = 0; i < mediumWidthHeight**2; i++)
        board[i] = ' '
}
//buildBoardArray()
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
//placeMines()

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


function flood(idx){    
    //console.log(visitedCell)
    let x = document.getElementById(idx)
    let intIdx = parseInt(idx)
    if(visitedCell.includes(intIdx) || x.classList.contains('flag')){

    }else {
        visitedCell.push(intIdx)
        if(board[intIdx] !== ' '){
            //visitedCell.push(intIdx)
            console.log(visitedCell)
            x.classList.remove('hidden')
            return 
        }else {
            //visitedCell.push(intIdx)
            console.log(visitedCell)
            x.classList.remove('hidden')
            if(intIdx+16 < board.length)
                flood(intIdx+16)
            if(intIdx-16 >= 0)
                flood(intIdx-16)
            if(intIdx % 16 !== 15){
                flood(intIdx+1)
            }
            if(intIdx % 16 !== 0 ){
                flood(intIdx-1)
            }

        }
    }
}

function resetButton(){
    init()
    render()
}

function rightClick(event){
    event.preventDefault()
    const square = event.target
    console.log('right')
    if(square.classList.contains('hidden')){
        if(square.classList.contains('flag')){
            square.classList.remove('flag')
            flagCounter++
            mineCounter()
        }else{
            square.classList.add('flag')
            flagCounter--
            if(flagCounter === 0){
                checkWin()
            }
            mineCounter()
        }
    }
}

function leftClick(event){
    const square = event.target
    let idx = square.getAttribute('id')
    if(square.classList.contains('flag')){
        //do nothing
    }else if(board[idx] === 'X'){
        console.log('you are dead')
        board.forEach((el, i) => {
            const x = document.getElementById(i)
            x.classList.remove('hidden')                 
        })
        // square.classList.remove('hidden')
        deathCondition = true
    }else{
        flood(idx)
        moves++
        moveCounter()//probably not needed later
         
    }
}


//dynamically build the board & event listener for left and right clicks
function buildBoard(){
    board.forEach((sqr, i) =>{
        const square = document.createElement('div')
        square.innerText = board[i]
        if(board[i] === 'X'){
            square.classList.add('mine')
        }
        // console.log(board)
        square.classList.add('sqr')
        square.classList.add('hidden')
        square.id = i
        grid.appendChild(square)
        adjacentMines()
        mineCounter()
        moveCounter()
        square.addEventListener('click', leftClick)
        square.addEventListener('contextmenu', rightClick)           
    })
    if(deathCondition === true){
        return
    }  
}
//buildBoard()

init()
render()
/*----------------------------- Event Listeners -----------------------------*/
resetEl.addEventListener('click', resetButton)

// cell.forEach((sqr) =>{
//     sqr.addEventListener('click', leftClick)
//     sqr.addEventListener('oncontextmenu', rightClick)
// })