'use strict';

//=== 1 ===========================================================
var p1 = new Player('Ivan', 'X');
var p2 = new Player('Petro', 'O');
var currentPlayer = p1;

var gameField = document.getElementById('game-field');
gameField.addEventListener('click', onCellClick);

//=== 2 ===========================================================
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
        //TODO посчитать очки
        //TODO сбросить игровое поле при нажатии кнок Ресет
        //TODO Если кто-то победил и до того как нажата кнопка ресет, поле должно быть недоступно. Не реагировать на клик.
        setInterval(function () {
            alert(currentPlayer.symbol + " - you are a winner!");
        }, 0);
        return;
    }
    currentPlayer = currentPlayer === p1 ? p2 : p1;
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

function Player(name, symbol) {
    this.name = name;
    this.symbol = symbol;
    this.score = 0;
}