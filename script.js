let currentPlayer = "red";
const maxRow = 6;
const maxCol = 7;
let gameOver = false;
const message = document.getElementById("message");

function createBoard() {
	const gameBoard = document.querySelector(".game-board");
	for (let i = 0; i < maxRow; ++i) {
		for (let j = 0; j < maxCol; ++j) {
			const spanForCell = document.createElement("span");
			spanForCell.classList.add("cssCell");
			gameBoard.appendChild(spanForCell);
		}
	}
}
createBoard();

function handleCellClick() {
	const gridCell = document.querySelectorAll(".cssCell");
	gridCell.forEach((cell) => {
		cell.addEventListener("click", (event) => {
			if (gameOver) return;

			if (
				!cell.classList.contains("red") &&
				!cell.classList.contains("yellow")
			) {
				cell.classList.add(currentPlayer);
			} else {
				message.textContent = "This cell is already colored!";
				setTimeout(() => {
					message.textContent = "";
				}, 2000);
				return;
			}
			checkWinner();
			changePlayer();
		});
	});
}
handleCellClick();

function changePlayer() {
	if (currentPlayer === "red") {
		currentPlayer = "yellow";
	} else {
		currentPlayer = "red";
	}
}

function checkWinner() {
	const gridCell = document.querySelectorAll(".cssCell");
	for (let i = maxRow; i > 0; --i) {
		for (let j = 0; j < maxCol - 3; ++j) {
			const currentIndex = (i - 1) * maxCol + j;
			if (
				gridCell[currentIndex].classList.contains(currentPlayer) &&
				gridCell[currentIndex + 1].classList.contains(currentPlayer) &&
				gridCell[currentIndex + 2].classList.contains(currentPlayer) &&
				gridCell[currentIndex + 3].classList.contains(currentPlayer)
			) {
				message.textContent = `Winner on horizontal! The player with color ${currentPlayer} wins.`;
				gameOver = true;
			}
		}
	}
}

function resetGame() {
	const gridCell = document.querySelectorAll(".cssCell");
	gridCell.forEach((cell) => {
		cell.classList.remove("red", "yellow");
	});
	message.textContent = "";
	currentPlayer = "red";
	gameOver = false;
}
