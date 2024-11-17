let currentPlayer = "red";
const maxRow = 6;
const maxCol = 7;
let gameOver = false;
const MESSAGE_TIMEOUT = 2000;
const message = document.getElementById("message");

let board = [];
for (let i = 0; i < maxRow; ++i) {
	board[i] = [];
	for (let j = 0; j < maxCol; ++j) {
		board[i][j] = null;
	}
}

function createBoard() {
	const gameBoard = document.querySelector(".game-board");
	for (let i = 0; i < maxRow; ++i) {
		for (let j = 0; j < maxCol; ++j) {
			const spanForCell = document.createElement("span");
			spanForCell.classList.add("cssCell");
			spanForCell.dataset.row = i;
			spanForCell.dataset.col = j;
			gameBoard.appendChild(spanForCell);
		}
	}
}
createBoard();

function handleCellClick() {
	const gridCell = document.querySelectorAll(".cssCell");
	gridCell.forEach((cell) => {
		cell.addEventListener("click", () => {
			if (gameOver) return;

			const row = parseInt(cell.dataset.row);
			const col = parseInt(cell.dataset.col);

			if (board[row][col] !== null) {
				message.textContent = "This cell is already colored!";
				setTimeout(() => {
					message.textContent = "";
				}, MESSAGE_TIMEOUT);
				return;
			}

			if (isValidMove(row, col)) {
				board[row][col] = currentPlayer;
				cell.classList.add(currentPlayer);
				checkWinner();
				changePlayer();
			} else {
				message.textContent = "Not allowed yet!";
				setTimeout(() => {
					message.textContent = "";
				}, MESSAGE_TIMEOUT);
			}
		});
	});
}
handleCellClick();

function isValidMove(row, col) {
	return row === maxRow - 1 || board[row + 1][col] !== null;
}

function changePlayer() {
	if (currentPlayer === "red") {
		currentPlayer = "yellow";
	} else {
		currentPlayer = "red";
	}
}

function checkWinner() {
	const gridCell = document.querySelectorAll(".cssCell");

	for (let i = maxRow - 1; i >= 0; --i) {
		for (let j = 0; j < maxCol; ++j) {
			const currentIndex = i * maxCol + j;

			if (
				j <= maxCol - 4 &&
				gridCell[currentIndex].classList.contains(currentPlayer) &&
				gridCell[currentIndex + 1].classList.contains(currentPlayer) &&
				gridCell[currentIndex + 2].classList.contains(currentPlayer) &&
				gridCell[currentIndex + 3].classList.contains(currentPlayer)
			) {
				message.textContent = `Winner on horizontal! The player ${currentPlayer} wins.`;
				gameOver = true;
				return;
			}

			if (
				i >= 3 &&
				gridCell[currentIndex].classList.contains(currentPlayer) &&
				gridCell[currentIndex - maxCol].classList.contains(
					currentPlayer
				) &&
				gridCell[currentIndex - 2 * maxCol].classList.contains(
					currentPlayer
				) &&
				gridCell[currentIndex - 3 * maxCol].classList.contains(
					currentPlayer
				)
			) {
				message.textContent = `Winner on vertical! The player ${currentPlayer} wins.`;
				gameOver = true;
				return;
			}

			if (
				i >= 3 &&
				j <= maxCol - 4 &&
				gridCell[currentIndex].classList.contains(currentPlayer) &&
				gridCell[(i - 1) * maxCol + (j + 1)].classList.contains(
					currentPlayer
				) &&
				gridCell[(i - 2) * maxCol + (j + 2)].classList.contains(
					currentPlayer
				) &&
				gridCell[(i - 3) * maxCol + (j + 3)].classList.contains(
					currentPlayer
				)
			) {
				message.textContent = `Winner on diagonal! The player ${currentPlayer} wins.`;
				gameOver = true;
				return;
			}

			if (
				i >= 3 &&
				j >= 3 &&
				gridCell[currentIndex].classList.contains(currentPlayer) &&
				gridCell[(i - 1) * maxCol + (j - 1)].classList.contains(
					currentPlayer
				) &&
				gridCell[(i - 2) * maxCol + (j - 2)].classList.contains(
					currentPlayer
				) &&
				gridCell[(i - 3) * maxCol + (j - 3)].classList.contains(
					currentPlayer
				)
			) {
				message.textContent = `Winner on diagonal! The player ${currentPlayer} wins.`;
				gameOver = true;
				return;
			}
		}
	}
}

function resetGame() {
	for (let i = 0; i < maxRow; i++) {
		for (let j = 0; j < maxCol; j++) {
			board[i][j] = null;
		}
	}

	const gridCell = document.querySelectorAll(".cssCell");
	gridCell.forEach((cell) => {
		cell.classList.remove("red", "yellow");
	});

	message.textContent = "";
	currentPlayer = "red";
	gameOver = false;
}
