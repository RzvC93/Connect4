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

	for (let i = maxRow - 1; i >= 0; --i) {
		for (let j = 0; j < maxCol; ++j) {
			const currentIndex = i * maxCol + j;

			// Horizontal check
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

			// Vertical check
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

			// Diagonal check (from bottom left to top right)
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

			// Diagonal check (from bottom right to top left)
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
	const gridCell = document.querySelectorAll(".cssCell");
	gridCell.forEach((cell) => {
		cell.classList.remove("red", "yellow");
	});
	message.textContent = "";
	currentPlayer = "red";
	gameOver = false;
}
