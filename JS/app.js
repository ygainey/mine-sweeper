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

/*------------------------ Cached Element References ------------------------*/
const grid = document.querySelector('.grid')

/*-------------------------------- Functions --------------------------------*/
// function init(){

// }
// function render(){

// }



function buildBoardArray(){
    for(let i = 0; i < mediumWidthHeight**2; i++)
        board[i] = '0'
}
buildBoardArray()

function placeMines(){
    for (let i = 0; i < numOfMinesMedium; i++){
        let j = Math.floor(Math.random() * board.length-1)
        while(board[j] !== '0'){
            j = Math.floor(Math.random() * board.length-1)
        }
        // console.log(`i: ${i} j: ${j}`)
        // console.log(`i: ${i} j: ${k}`)
        board[j] = 'X'
    }
    // console.log(board)
}
placeMines()

function buildBoard(){
    board.forEach((sqr, i) =>{
        const square = document.createElement('div')
        square.innerText = board[i]
        square.classList.add('sqr')
        square.id = i
        grid.appendChild(square)
    })
}
buildBoard()



// function moverCounter(){
//     moves++
//     console.log(moves)
// }
// moveCounter()


// function mineCounter(){
//     numOfMines--
//     console.log(numOfMines)
// }
//mineCounter()

// init()
/*----------------------------- Event Listeners -----------------------------*/

