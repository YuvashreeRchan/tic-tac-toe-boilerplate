const winningPatterns = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]];
let playerXMoves = [];
let playerOMoves = [];
let clickCount = 0;
let gameWon = false;

const boxes = document.querySelectorAll(".box");
const message = document.getElementById("message");
const resultDisplay = document.getElementById("result");
const restartButton = document.getElementById("button");

boxes.forEach(box => 
    {
        box.addEventListener("click", handleBoxClicks);
    });

function handleBoxClicks(e) 
{
    const boxId = parseInt(e.target.id) - 1;
    const currentPlayer = clickCount % 2 === 0 ? "X" : "O";
    const text = document.createElement('p');
    text.textContent = currentPlayer;
    text.style.color = '#FAB201';
    e.target.appendChild(text);

    if (currentPlayer === 'X') 
    {
        playerXMoves.push(boxId);
    } else {
        playerOMoves.push(boxId);
    }

    clickCount++;

    if (clickCount >= 5) {
        checkGameResult();
    }
}

function checkGameResult() {
    const currentPlayer = clickCount % 2 === 0 ? "X" : "O";
    const currentAttempts = currentPlayer === "X" ? playerXMoves : playerOMoves;

    for (let patterns of winningPatterns) {
        let count = 0;
        for (let pos of patterns) {
            if (currentAttempts.includes(pos)) {
                count++;
            }
        }
        if (count === 3) {
            gameWon = true;
            displayResult(currentPlayer);
            break;
        }
    }

    if (clickCount === 9 && !gameWon) {
        displayResult("Draw");
    }
}

// Function to display game result
function displayResult(resultMessage) {
    resultDisplay.style.visibility = "visible";
    if(resultMessage=="Draw"){
        message.innerHTML = "It is a TIE";
    }
    else{
    message.innerHTML = "'"+  resultMessage +"'" + " Won the game!"; }
}

// Restarting the Game
restartButton.onclick = () => {
    window.location.reload();
};
