// Convert HTML elements into JS constants

const refresh = document.querySelector("#refresh");
const turnText = document.querySelector("#turnText");
const turnImg = document.querySelector("#turnImg");
const overlay = document.querySelector("#overlay");
const winner = document.querySelector("#winner");
const next = document.querySelector("#next");
const reset = document.querySelector("#reset");


// FUNCTIONS TRIGGERED THROUGH HTML INTERACTIONS

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


// HOVER EFFECTS ON AVAILABLE CELLS

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


// FUNCTIONS MODIFYING HTML //
function newGame() { // Initialise the game & switch player
    turnImg.src = currentPlayer.sign
    board = [[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]]
    drawBoard()
    gameStatus = "live"
    overlay.style.display = "none"
}

function drawBoard() { // Add sign to selected cell.
    positionMarkers.forEach(i => {
        document.getElementById(`img${i}`).src = `${board[i[0]][i[1]]}`;
        document.getElementById(`cel${i}`).style.backgroundColor = "#1f3540"
    });
}

function paintWinningCells(i) {
    i.forEach(y => {
        document.getElementById(`cel${y}`).style.backgroundColor = currentPlayer.color;
        document.getElementById(`img${y}`).src = currentPlayer.blackSign;
    })
}

function endGame() { // to do: try to move logic into back.js
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