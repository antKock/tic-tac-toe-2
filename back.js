// VARIABLES //
const player1 = {
    name: "you",
    score: 0,
    color: "#31c4be",
    playedMoves: [],
    scoreCell: document.querySelector("#score1"),
    sign: `assets/cross.png`,
    blackSign: `assets/cross-black.png`
}

const player2 = {
    name: "CPU",
    score: 0,
    color: "#f2b237",
    playedMoves: [],
    scoreCell: document.querySelector("#score2"),
    sign: `assets/circle.png`,
    blackSign: `assets/circle-black.png`
}

const playerTie = {
    name: "TIE",
    color: "#31c4be",
    score: 0,
    scoreCell: document.querySelector("#scoreTie")
}

let gameStatus = "live" // Makes sure player can't trigger a move when game is over

let currentPlayer = player1 // to do: Randomise

let board = [[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]]

let move = ""
let moveX = ""
let moveY = ""

const positionMarkers = ["00", "01", "02", "10", "11", "12", "20", "21", "22"];
const winningSituations = [["00", "01", "02"], ["10", "11", "12"], ["20", "21", "22"], ["00", "10", "20"], ["01", "11", "21"], ["02", "12", "22"], ["00", "11", "22"], ["02", "11", "20"]]

// FUNCTIONS //
function nextPlayer() { // Switch active player. To do: Real random, with Tie handled
    if (currentPlayer === player2) {
        currentPlayer = player1
    } else {currentPlayer = player2}

    turnImg.src = currentPlayer.sign

    if (currentPlayer === player2) {cpuMove()}
}



function cpuMove() {
    // Get a filtered list of available Cells
    let availableCells = positionMarkers.map(addIfAvailable)
    function addIfAvailable(i) {
        if (isMoveAllowed(i[0], i[1]) === true) {
            return i;
        }
    }
    availableCells = availableCells.filter(i => i)

    // Pick randomly the available cell to play
    let nthAvailableCell = Math.floor(Math.random() * availableCells.length)

    // After 500ms, play the move
    setTimeout(function () {
        play(availableCells[nthAvailableCell])
    }, 500);
}

function play(i) { // Triggered when a player picks a cell
    if (gameStatus === "end") { return }
    move = i; // Save the selected cells value to use it later on

    if (isMoveAllowed(move[0], move[1]) === true) { // If move allowed, apply
        applyMove(moveX, moveY)
    } else return // Else, cancel the move

    if (isVictory() === true) { // If win, end game
        endGame()
    } else if (isRemainingMove() === false) { // If tie, end game
        currentPlayer = playerTie
        endGame()
    } else {
        nextPlayer() // If not ended, next player, end of the move
    }
}

function isMoveAllowed(X, Y) { // Check if cell is still available
    if (board[X][Y] === " ") { // Stores cell position in board
        moveX = move[0]
        moveY = move[1]
        return true
    } else {
        return false // Else, cancel the move
    }
}

function applyMove(X, Y) {     // Apply user's move in the board
    board[X][Y] = currentPlayer.sign // Convert position into sign img code
    currentPlayer.playedMoves.push(move)
    drawBoard()
}

function isVictory() { // Check if currentPlayer won, by comparing Winning Situations with Played moves.
    let winningCells = []; // An empty array to store a potential Winning Situation 
    winningSituations.forEach(i => { // Apply a function for each winning situation
        let matchCount = 0; // A counter to know how many cells are part of the list of played moves
        i.forEach(y => { // Apply a function for each cell
            if (currentPlayer.playedMoves.includes(y)) { matchCount += 1 } // If "y" cell matchs a played move, +1 on counter
            if (matchCount === 3) { // If 3 matches = Victory, paint winning cells and store them
                paintWinningCells(i); // to do: move this call in the endGame() function
                winningCells = i
            }
        })
    })
    if (winningCells != "") { return true }
}

// Maybe add paintWinningCells() here

function isRemainingMove() { // Check if there is a tie
    let remainingMove = []
    for (let i = 0; i < 3; i += 1) {
        for (let y = 0; y < 3; y += 1) {
            if (board[i][y] === " ") {
                return true
            }
        }
    }
    return false
}

// Maybe add endGame() and resetScores() here

