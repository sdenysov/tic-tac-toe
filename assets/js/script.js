'use strict';

//=== 1 ===========================================================
var p1 = new Player('Ivan', 'X');
var p2 = new Player('Petro', 'O');
var currentPlayer = p1;

var gameFieldElement = document.getElementById('game-field');
gameFieldElement.addEventListener('click', onCellClick);

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
    if (undefined !== winnerLine && winnerLine.length) {
        alert("You are a winner!");
        //TODO ...
        return;
    }
    currentPlayer = currentPlayer === p1 ? p2 : p1;
}

//== 3 ============================================================
function isTurnAvailable(target) {
    return target.tagName === 'TD' && !target.innerHTML;
}

function findWinnerLine(currentPlayer) {
    var row = findWinnerRow(currentPlayer);
    if (undefined !== row && row.length) {
        return row;
    }

    var col = findWinnerCol(currentPlayer);
    if (undefined !== col && col.length) {
        return col;
    }

    var diagonal = findWinnerDiagonal(currentPlayer);
    if (undefined !== diagonal && diagonal.length) {
        return diagonal;
    }
}

//== 4 =========================================================
function findWinnerRow(currentPlayer) {
    for (var j = 0; j < 3; j++) {
        var WinnerRow = document.getElementById('game-field').rows[j];
        var count = 0;
        for (var i = 0; i < 3; i++) {
            if (WinnerRow.cells[i].innerHTML === currentPlayer.symbol) {
                count++;
            }
        }
        if (count === 3) {
            return WinnerRow.cells;
        }
    }
    //TODO ...
}

function findWinnerCol(currentPlayer) {
    for (var i = 0; i < 3; i++) {
        var count = 0;
        for (var j = 0; j < 3; j++) {
            var WinnerCol = document.getElementById('game-field').rows[j];
            if (WinnerCol.cells[i].innerHTML === currentPlayer.symbol) {
                count++;
            }
        }
        if (count === 3) {
            return WinnerCol.cells;
        }
    }
    //TODO ...
}

function findWinnerDiagonal(currentPlayer) {
    var count = 0;
    for (var j = 0; j < 3; j++) {
        var WinnerDiagonal = document.getElementById('game-field').rows[j];
        if (WinnerDiagonal.cells[j].innerHTML === currentPlayer.symbol) {
            count++;
        }
        if (count === 3) {
            return WinnerDiagonal.cells;
        }
    }
    count = 0;
    var i = 2;
    for (j = 0; j < 3; j++, i--) {
        WinnerDiagonal = document.getElementById('game-field').rows[j];
        if (WinnerDiagonal.cells[i].innerHTML === currentPlayer.symbol) {
            count++;
        }
        if (count === 3) {
            return WinnerDiagonal.cells;
        }
    }
    //TODO ...
}

function Player(name, symbol) {
    this.name = name;
    this.symbol = symbol;
    this.score = 0;
}



