// VARIABLES //
const player1 = {
    name: "you",
    score: 0,
    color: "#31c4be",
    playedMoves: [],
    scoreCell: document.querySelector("#score1"),
    bigSign: `<img class="bigSign" src="assets/cross.png">`,
    microSign: `<img class="microSign" src="assets/cross.png" style="margin-right: 0.5em;">`,
    blackSign: `<img class="bigSign" src="assets/cross-black.png">`
}

const player2 = {
    name: "CPU",
    score: 0,
    color: "#f2b237",
    playedMoves: [],
    scoreCell: document.querySelector("#score2"),
    bigSign: `<img class="bigSign" src="assets/circle.png">`,
    microSign: `<img class="microSign" src="assets/circle.png" style="margin-right: 0.5em;">`,
    blackSign: `<img class="bigSign" src="assets/circle-black.png">`
}

const playerTie = {
    name: "TIE",
    color: "#31c4be",
    score: 0,
    scoreCell: document.querySelector("#scoreTie")
}

let currentPlayer = player1 // to do: Randomise
let move = ""
let moveX = ""
let moveY = ""

let board = [[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]]
const positionMarkers = ["00", "01", "02", "10", "11", "12", "20", "21", "22"];
const winningSituations = [["00", "01", "02"], ["10", "11", "12"], ["20", "21", "22"], ["01", "11", "21"], ["02", "12", "22"], ["00", "11", "22"], ["02", "11", "20"]]

let gameStatus = "live" // Makes sure player can't trigger a move when game is over

// Get HTML elements
const refresh = document.querySelector("#refresh");
const turnText = document.querySelector("#turnText");
const overlay = document.querySelector("#overlay");
const winner = document.querySelector("#winner");
const next = document.querySelector("#next");
const reset = document.querySelector("#reset");

/* Attempt to simplify my constants generation 
const htmlElements = [ refresh, turnText, overlay, winner, next, reset]
htmlElements.forEach(i => {
    const i = document.querySelector(`${i}`)
});
*/

// FUNCTIONS //

function newGame() { // Initialise the game & switch player
    turnText.innerHTML = `${currentPlayer.microSign}    TURN`
    board = [[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]]
    drawBoard()
    gameStatus = "live"
    overlay.style.display = "none"
}

function nextPlayer() { // Switch active player. To do: Real random, with Tie handled
    if (currentPlayer === player2) {
        currentPlayer = player1;
    } else {
        currentPlayer = player2;
        cpuMove()
    }
}

function drawBoard() { // Add sign to selected cell.
    positionMarkers.forEach(i => {
        document.getElementById(`cel${i}`).innerHTML = `${board[i[0]][i[1]]}`;
        document.getElementById(`cel${i}`).style.backgroundColor = "#1f3540"
    });
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
    board[X][Y] = currentPlayer.bigSign // Convert position into sign img code
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

function paintWinningCells(i) {
    i.forEach(y => {
        document.getElementById(`cel${y}`).style.backgroundColor = currentPlayer.color;
        document.getElementById(`cel${y}`).innerHTML = currentPlayer.blackSign;
    })
}

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

function endGame() {
    // Update Player score
    currentPlayer.score += 1; // in JS
    currentPlayer.scoreCell.innerHTML = currentPlayer.score; // in HTML

    // Display Overlay
    overlay.style.display = "flex";

    // Display winner's name
    switch (currentPlayer) {
        case player1:
            winner.innerHTML = `YOU<br>WIN`
            break;
        case player2:
            winner.innerHTML = `${currentPlayer.name}<br>WINS`
            break;
        case playerTie:
            winner.innerHTML = `TIE`
            break;
    }

    // Display winner's colors
    next.style.backgroundColor = currentPlayer.color;
    winner.style.color = currentPlayer.color;

    // Prevent next player to play
    gameStatus = "end"

    // Reset currentPlayer & players' moves
    currentPlayer = player1;
    player1.playedMoves = [];
    player2.playedMoves = [];
}


function resetScores() { // Reset scores and triggers a new game.
    player1.score = 0;
    player1.scoreCell.innerHTML = player1.score;
    player2.score = 0;
    player2.scoreCell.innerHTML = player2.score;
    playerTie.score = 0;
    playerTie.scoreCell.innerHTML = playerTie.score;
    newGame();
}

// HOVER EFFECT ON AVAILABLE CELLS

function mouseover(i) { // When available cell is hovered
    if (isMoveAllowed(i[0], i[1]) === true) {
        document.querySelector(`#cel${i}`).style.cursor = "pointer";
        document.querySelector(`#cel${i}`).style.backgroundColor = currentPlayer.color;
    } else {
        document.querySelector(`#cel${i}`).style.cursor = "default";
    }
}

function mouseout(i) { // When available cell is no longer hovered
    if (isMoveAllowed(i[0], i[1]) === true) {
        document.querySelector(`#cel${i}`).style.cursor = "default";
        document.querySelector(`#cel${i}`).style.backgroundColor = "#1f3540"
    } else {
        document.querySelector(`#cel${i}`).style.cursor = "default";
    }
}

// ADD INTERACTION LISTENERS ON HTML ELEMENTS TO TRIGGER JS FUNCTIONS

refresh.addEventListener("click", newGame, false);
next.addEventListener("click", newGame, false);
reset.addEventListener("click", resetScores, false);

positionMarkers.forEach(i => { // Listen to click on each cell to trigger a move
    document.querySelector(`#cel${i}`).addEventListener("click", function () { play(`${i}`) })
});

positionMarkers.forEach(i => { // Listen to mouseover on each cell to trigger a hover effect
    document.querySelector(`#cel${i}`).addEventListener("mouseover", function () { mouseover(`${i}`) })
});

positionMarkers.forEach(i => { // Listen to mouseover ending on each cell to trigger a hover effect
    document.querySelector(`#cel${i}`).addEventListener("mouseout", function () { mouseout(`${i}`) })
});

// INITIATE FIRST GAME AFTER PAGE LOADED
newGame()