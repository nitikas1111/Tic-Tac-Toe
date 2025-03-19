$(document).ready(function () {
    let currentPlayer = "X";
    let board = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;

    const winningCombo = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    $(".cell").click(function(){
        let index = $(this).data("index");

        if (board[index] === "" && gameActive) { 
            board[index] = currentPlayer;
            $(this).text(currentPlayer).addClass("taken");

            if (checkWinner(currentPlayer)) {
                $("#status").text("Player " + currentPlayer + " wins!");
                gameActive = false;
                return;
            }

            if (!board.includes("")) {
                $("#status").text("It's a Draw!");
                gameActive = false;
                return;
            }

            currentPlayer = (currentPlayer === "X") ? "O" : "X";
            $("#status").text("Player " + currentPlayer + "'s Turn");
        }
    });

    function checkWinner(player) {
        return winningCombo.some(combination => {
            return combination.every(index => board[index] === player);
        });
    }

    $("#reset").click(function() {
        board = ["", "", "", "", "", "", "", "", ""];
        $(".cell").text("").removeClass("taken");
        currentPlayer = "X";
        gameActive = true;
        $("#status").text("Player X's Turn");
    });
});
