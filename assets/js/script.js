'use strict';

var config = JSON.parse(localStorage.getItem('initConfig'));
var p1 = new Player(config.player1, 'X', 'score-p1');
var p2 = new Player(config.player2, 'O', 'score-p2');
var currentPlayer = p1;

document.getElementById('player1-name').innerHTML=config.player1;
document.getElementById('player2-name').innerHTML=config.player2;

var gameField = document.getElementById('game-field');
if (gameField) {
    gameField.addEventListener('click', onCellClick);
}
var resetBtn = document.getElementById('reset-btn');
if (resetBtn) {
    resetBtn.addEventListener('click', resetGameField);
}

//=== 2 ===========================================================
function resetGameField() {
    document.getElementsByTagName('td').innerHTML = "";
    //TODO
}

function onCellClick(event) {
    var cellElement = event.target;
    if (isTurnAvailable(cellElement)) {
        doTurn(cellElement);
    }
}

function doTurn(cellElement) {
    cellElement.innerHTML = currentPlayer.symbol;
    var winnerLine = findWinnerLine(currentPlayer);
    if (winnerLine.length) {
        highlightCells(winnerLine);
        currentPlayer.incrementScore();
        //TODO посчитать очки
        //TODO сбросить игровое поле при нажатии кнок Ресет
        //TODO Если кто-то победил и до того как нажата кнопка ресет, поле должно быть недоступно. Не реагировать на клик.
        setTimeout(function () {
            alert(currentPlayer.name + " - you are a winner!");
        }, 0);
        gameField.addEventListener("click", CellBlock, true);
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

function findWinnerLine(player) {
    var row = gameUtils.findWinnerRow(gameField, player);
    if (row.length) {
        return row;
    }
    var col = gameUtils.findWinnerCol(gameField, player);
    if (col.length) {
        return col;
    }
    return gameUtils.findWinnerDiagonal(gameField, player);
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