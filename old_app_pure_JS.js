// const prompt = require('prompt-sync')();
/*
class Point {
    Constructor(x, y) {
        this.x = x
         this.y = y
   }
}
const position = new Point(1, 2)
position.x
*/

// Variables
const player1 = {
    name: "Player 1",
    sign: "X"
}

const player2 = {
    name: "Player 2",
    sign: "O"
}



let currentPlayer = player2
let move = ""
let moveX = ""
let moveY = ""

let board = [[" "," "," "],[" "," "," "],[" "," "," "]]
let boardDrawn = `\n—————————————\n| ${board[0][0]} | ${board[0][1]} | ${board[0][2]} |\n—————————————\n| ${board[1][0]} | ${board[1][1]} | ${board[1][2]} |\n—————————————\n| ${board[2][0]} | ${board[2][1]} | ${board[2][2]} |\n—————————————\n \n————————————————————————`


// Functions definition

// Turn board array into text output
function drawBoard() {
    boardDrawn = `\n—————————————\n| ${board[0][0]} | ${board[0][1]} | ${board[0][2]} |\n—————————————\n| ${board[1][0]} | ${board[1][1]} | ${board[1][2]} |\n—————————————\n| ${board[2][0]} | ${board[2][1]} | ${board[2][2]} |\n—————————————\n \n—————————————————————`
}

// Initialise the game, with a new board, and changing player
function newGame() {
    console.log('\nAre you Tic Tac, Toe?\n')
    nextPlayer()
    board = [[" "," "," "],[" "," "," "],[" "," "," "]]
    drawBoard()
    console.log(boardDrawn)
}

function nextPlayer() {
    if (currentPlayer === player2) {
        currentPlayer = player1;
    } else
        currentPlayer = player2;
}

function getMove() {
    move = prompt(`What's your move? `)
    isMoveAllowed(move[0], move[1])
}

function isMoveAllowed(X,Y) {
    if (board[X][Y] === " ") {
        moveX = move[0]
        moveY = move[1]
        return true
    } else {
        console.log("Bad move")
        getMove()
        return false
    }
}

// Add user's move in the board
function drawMove(X,Y) {
    board[X][Y] = currentPlayer.sign
    drawBoard()
}

function applyMove(X,Y) {
        drawMove(X, Y),
        displayBoard()
}

// Check if some moves remain available
function isRemainingMove() {
    for (let i = 0; i < 3; i += 1) {
        for (let y = 0; y < 3; y += 1) {
            if (board[i][y] === " ") {
                return true
            }
        }
    }
    return false
}

function isVictory() {
    // Check for "horizontal win"
    for (let i = 0; i < 3; i += 1) {
        if (board[i][0] != " " && board[i][0] === board[i][1] && board[i][0]=== board[i][2]) {
            return true
        }
    }
    // Check for "vertical win"
    for (let i = 0; i < 3; i += 1) {
        if (board[0][i] != " " && board[0][i] === board[1][i] && board[0][i]=== board[2][i]) {
            return true
        }
    }
    // Check for "oblic win"
    if (board[0][0] != " " && board[0][0] === board[1][1] && board[0][0]=== board[2][2]) {
        return true
    }
    if (board[2][0] != " " && board[2][0] === board[1][1] && board[2][0]=== board[0][2]) {
        return true
    }
    return false
}

function suggestRestart() {
    let doRestart = prompt(`Replay? y/n `)
    if (doRestart === "y") {
        start()
    } else {
        console.log("Au revoir!")
    }
}

function play() {
    console.log(`It's ${currentPlayer.name}'s turn!\n`)
    getMove()
    applyMove(moveX, moveY)
    if (isVictory() === true) {
        console.log(`Victoire! ${currentPlayer.name} gagne!\n`),
        suggestRestart()
    } else if (isRemainingMove() === false) {
        console.log(`Égalité! Personne ne gagne!\n`)     
        suggestRestart()
    } else {
        nextPlayer()
        play()
    }
}

function displayBoard() {
    console.log(boardDrawn)
}

function start() {
    newGame()
    play()
}

// Launch the game

start()



/* Tests

// changePlayer function
console.log(currentPlayer)
changePlayer()
console.log(currentPlayer)

*/