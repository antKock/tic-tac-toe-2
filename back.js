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

let currentPlayer = player1 // to do: Randomise

let board = [[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]]

let move = ""
let moveX = ""
let moveY = ""

const positionMarkers = ["00", "01", "02", "10", "11", "12", "20", "21", "22"];
const winningSituations = [["00", "01", "02"], ["10", "11", "12"], ["20", "21", "22"], ["01", "11", "21"], ["02", "12", "22"], ["00", "11", "22"], ["02", "11", "20"]]
