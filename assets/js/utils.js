var gameUtils = (function () {

    return {
        findWinnerRow: function (gameField, player) {
            var rows = getRows(gameField);
            return findLineContainsSameSymbols(rows, player.symbol);
        },
        findWinnerCol: function (gameField, player) {
            var cols = getCols(gameField);
            return findLineContainsSameSymbols(cols, player.symbol);
        },
        findWinnerDiagonal: function (gameField, player) {
            var diagonal = findLeftDiagonal(gameField, player);
            if (everyElementHasTheSameSymbol(diagonal, player.symbol)) {
                return diagonal;
            }
            diagonal = finRightDiagonal(gameField, player);
            return everyElementHasTheSameSymbol(diagonal, player.symbol) ? diagonal : [];
        }
    };

    function findLineContainsSameSymbols(array, symbol) {
        for (var i = 0; i < array.length; i++) {
            var line = array[i];
            if (everyElementHasTheSameSymbol(line, symbol)) {
                return line;
            }
        }
        return [];
    }

    function findLeftDiagonal(gameField) {
        var diagonal = [];
        for (var i = 1; i <= gameField.rows.length; i++) {
            diagonal.push(getCellByCoords(gameField, i, i));
        }
        return diagonal;
    }

    function finRightDiagonal(gameField) {
        var diagonal = [];
        var size = gameField.rows.length;
        for (var i = 1, j = size; i <= size; i++, j--) {
            diagonal.push(getCellByCoords(gameField, i, j));
        }
        return diagonal;
    }

    function getRows(gameField) {
        var rows = [];
        var trElements = gameField.rows;
        for (var i = 0; i < trElements.length; i++) {
            var row = [];
            var tdElements = trElements[i].cells;
            for (var j = 0; j < tdElements.length; j++) {
                row.push(tdElements[j]);
            }
            rows.push(row);
        }
        return rows;
    }

    function getCols(gameField) {
        var cols = [];
        var rows = getRows(gameField);
        for (var i = 0; i < rows.length; i++) {
            var col = [];
            for (var j = 0; j < rows.length; j++) {
                col.push(rows[j][i]);
            }
            cols.push(col);
        }
        return cols;
    }

    function everyElementHasTheSameSymbol(array, symbol) {
        return array.every(function (elem) {
            return elem.innerHTML === symbol;
        })
    }

    function getCellByCoords(gameField, row, col) {
        var selector = 'td[row="' + row + '"][col="' + col + '"]';
        return gameField.querySelector(selector);
    }
})();