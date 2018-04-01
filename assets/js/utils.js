var gameUtils = (function () {

    var WINNER_LINE_LENGTH = 5;

    return {
        findWinnerRow: function (cell, gameField, symbol) {
            var coords = getCoords(cell);
            var resultLine = [cell];
            var directions = [1, -1];
            directions.forEach(function (direction) {
                var col = coords.col + direction;
                var currentCell = getCellByCoords(gameField, coords.row, col);
                while (currentCell && currentCell.innerHTML === symbol) {
                    resultLine.push(currentCell);
                    currentCell = getCellByCoords(gameField, coords.row, col += direction);
                }
            });
            return resultLine.length === WINNER_LINE_LENGTH ? resultLine : [];
        },
        findWinnerCol: function (cell, gameField, symbol) {
            var coords = getCoords(cell);
            var resultLine = [cell];
            var directions = [1, -1];
            directions.forEach(function (direction) {
                var row = coords.row + direction;
                    var currentCell = getCellByCoords(gameField, row, coords.col);
                while (currentCell && currentCell.innerHTML === symbol) {
                    resultLine.push(currentCell);
                    currentCell = getCellByCoords(gameField, row += direction, coords.col);
                }
            });
            return resultLine.length === WINNER_LINE_LENGTH ? resultLine : [];
        },
        findWinnerDiagonal: function (cell, gameField, symbol) {
            var resultLine = findRightDiagonal(cell, gameField, symbol);
            if(resultLine) {
                return resultLine;
            }
            resultLine = findLeftDiagonal(cell, gameField, symbol);
            return resultLine;
        }
    };

    function findRightDiagonal(cell, gameField, symbol) {
        var coords = getCoords(cell);
        var diagonal = [cell];
        var directions = [1, -1];
        directions.forEach(function (direction) {
            var row = coords.row - direction;
            var col = coords.col + direction;
            var currentCell = getCellByCoords(gameField, row, col);
            while (currentCell && currentCell.innerHTML === symbol) {
                diagonal.push(currentCell);
                currentCell = getCellByCoords(gameField, row -= direction, col+= direction);
            }
        });
        return diagonal.length === WINNER_LINE_LENGTH ? diagonal : [];
    }

    function findLeftDiagonal(cell, gameField, symbol) {
        var coords = getCoords(cell);
        var diagonal = [cell];
        var directions = [1, -1];
        directions.forEach(function (direction) {
            var row = coords.row + direction;
            var col = coords.col + direction;
            var currentCell = getCellByCoords(gameField, row, col);
            while (currentCell && currentCell.innerHTML === symbol) {
                diagonal.push(currentCell);
                currentCell = getCellByCoords(gameField, row += direction, col+= direction);
            }
        });
        return diagonal.length === WINNER_LINE_LENGTH ? diagonal : [];
    }

    function getCellByCoords(gameField, row, col) {
        var selector = 'td[row="' + row + '"][col="' + col + '"]';
        return gameField.querySelector(selector);
    }

    function getCoords(cell) {
        return {
            row: +cell.getAttribute('row'),
            col: +cell.getAttribute('col')
        }
    }
})();