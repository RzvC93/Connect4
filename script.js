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

				if (!gameOver && checkDraw()) {
					message.textContent = "It's a draw! Nobody wins.";
					gameOver = true;
					return;
				}

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

function checkWinner() {
	for (let i = 0; i < maxRow; i++) {
		for (let j = 0; j < maxCol; j++) {
			if (
				checkDirection(i, j, 0, 1) || // Horizontal
				checkDirection(i, j, 1, 0) || // Vertical
				checkDirection(i, j, 1, 1) || // Diagonal
				checkDirection(i, j, -1, 1) // Diagonal
			) {
				message.textContent = `Winner! The player ${currentPlayer} wins.`;
				gameOver = true;
				return;
			}
		}
	}
}

function checkDirection(startRow, startCol, rowIncrement, colIncrement) {
	let count = 0;

	for (let k = 0; k < 4; k++) {
		const newRow = startRow + k * rowIncrement;
		const newCol = startCol + k * colIncrement;

		if (
			newRow >= 0 &&
			newRow < maxRow &&
			newCol >= 0 &&
			newCol < maxCol &&
			board[newRow][newCol] === currentPlayer
		) {
			++count;
		} else {
			break;
		}
	}

	return count === 4;
}

function checkDraw() {
	for (let i = 0; i < maxRow; i++) {
		for (let j = 0; j < maxCol; j++) {
			if (board[i][j] === null) {
				return false;
			}
		}
	}
	return true;
}

function changePlayer() {
	if (currentPlayer === "red") {
		currentPlayer = "yellow";
	} else {
		currentPlayer = "red";
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
