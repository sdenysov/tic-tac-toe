'use strict';

var config = JSON.parse(localStorage.getItem('initConfig'));
var p1 = new Player(config.player1, 'X', 'score-p1');
var p2 = new Player(config.player2, 'O', 'score-p2');
var currentPlayer = p1;
document.getElementById('player1-name').innerHTML = config.player1;
document.getElementById('player2-name').innerHTML = config.player2;

var gameField = document.getElementById('game-field');
if (gameField) {
    createTable(gameField, config);
    gameField.addEventListener('click', onCellClick);
}
var resetBtn = document.getElementById('reset-btn');
if (resetBtn) {
    resetBtn.addEventListener('click', resetGameField);
}
var modalNoBtn = document.getElementById('modal-no-btn');
modalNoBtn.addEventListener('click', clickNo);
var modalYesBtn = document.getElementById('modal-yes-btn');
modalYesBtn.addEventListener('click', resetGameField);

//=== 2 ===========================================================
function createTable(gameField, config) {
    var grid = document.createDocumentFragment();
    for (var i = 1; i <= config.size; i++) {
        var trElem = document.createElement('tr');
        for (var j = 1; j <= config.size; j++) {
            var colElem = document.createElement('td');
            colElem.setAttribute('row', i);
            colElem.setAttribute('col', j);
            trElem.appendChild(colElem);
        }
        grid.appendChild(trElem);
    }
    gameField.appendChild(grid);
}

function clickNo() {

    gameField.addEventListener("click", CellBlock, true);
}

function resetGameField() {
    var cells = gameField.getElementsByTagName('td');
    [].forEach.call(cells, function (cell) {
        cell.innerHTML = "";
        cell.style.backgroundColor = "white";
    })
}

function onCellClick(event) {
    var cellElement = event.target;
    if (isTurnAvailable(cellElement)) {
        doTurn(cellElement);
    }
}

function finalQuestion() {
    $('#modalDialog')
        .on('show.bs.modal', function () {
            var nameLabel = document.getElementById('name-label');
            nameLabel.innerHTML = currentPlayer.name;
        })
        .modal({
            backdrop: 'static',
            keyboard: false
        });
}

function doTurn(cell) {
    cell.innerHTML = currentPlayer.symbol;
    var winnerLine = findWinnerLine(cell, currentPlayer.symbol);
    if (winnerLine.length) {
        highlightCells(winnerLine);
        currentPlayer.incrementScore();
        finalQuestion();
        return;
    }
    currentPlayer = currentPlayer === p1 ? p2 : p1;
}

function CellBlock(event) {
    event.stopImmediatePropagation();
}

function highlightCells(line) {
    for (var i = 0; i < line.length; i++) {
        line[i].style.backgroundColor = 'yellow';
    }
}

//== 3 ============================================================
function isTurnAvailable(target) {
    return target.tagName === 'TD' && !target.innerHTML;
}

function findWinnerLine(cell, symbol) {
    var resultLine = gameUtils.findWinnerRow(cell, gameField, symbol);
    if (resultLine.length) {
        return resultLine;
    }
    resultLine = gameUtils.findWinnerCol(cell, gameField, symbol);
    if (resultLine.length) {
        return resultLine;
    }
    return gameUtils.findWinnerDiagonal(cell, gameField, symbol);
}

function Player(name, symbol, scoreBoardId) {
    this.name = name;
    this.symbol = symbol;
    this.score = 0;
    this.incrementScore = function () {
        var scoreBoard = document.getElementById(scoreBoardId);
        scoreBoard.querySelector('.score').innerHTML = ++this.score;
    }
}