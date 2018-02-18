var gameUtils = (function () {

    return {
        findWinnerRow: function (gameField, player) {
            var rows = gameField.rows;
            for (var j = 0; j < rows.length; j++) {
                var count = 0;
                var cells = rows[j].cells;
                for (var i = 0; i < cells.length; i++) {
                    if (cells[i].innerHTML === player.symbol) {
                        count++;
                    }
                }
                if (count === cells.length) {
                    return cells;
                }
            }
            return [];
        },
        findWinnerCol: function (gameField, player) {
            var rows = gameField.rows;
            var size = rows.length;
            for (var i = 0; i < size; i++) {
                var count = 0;
                for (var j = 0; j < size; j++) {
                    var row = rows[j];
                    if (row.cells[i].innerHTML === player.symbol) {
                        count++;
                    }
                }
                if (count === size) {
                    return row.cells;
                }
            }
            return [];
        },
        findWinnerDiagonal: function (gameField, player) {
            var diagonal = finLeftDiagonal(gameField, player);
            if (diagonal.length) {
                return diagonal;
            }
            return finRightDiagonal(gameField, player);
        }
    };

    function finLeftDiagonal(gameField, player) {
        var diagonal = [];
        var rows = gameField.rows;
        var size = rows.length;
        for (var i = 0; i < size; i++) {
            var cell = rows[i].cells[i];
            if (cell.innerHTML === player.symbol) {
                diagonal.push(cell);
            }
        }
        return diagonal.length === size ? diagonal : [];
    }

    function finRightDiagonal(gameField, player) {
        var diagonal = [];
        var rows = gameField.rows;
        var size = rows.length;
        for (var i = 0, j = size - 1; i < size; i++, j--) {
            var cell = rows[i].cells[j];
            if (cell.innerHTML === player.symbol) {
                diagonal.push(cell);
            }
        }
        return diagonal.length === size ? diagonal : [];
    }
})();