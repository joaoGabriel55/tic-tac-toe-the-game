import { useMemo, useState } from "react";

export default function useGameEngine(rowsAndCols = 3) {
  const cells = rowsAndCols * rowsAndCols;
  const initialBoard = Array(cells).fill("");

  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [gameActive, setGameActive] = useState(true);
  const [gameBoard, setGameBoard] = useState(initialBoard);

  function calculateWinningCombinations() {
    const winningCombinations = [];

    // Rows
    for (let i = 0; i < rowsAndCols; i++) {
      winningCombinations.push(
        Array.from({ length: rowsAndCols }, (_, j) => i * rowsAndCols + j)
      );
    }

    // Columns
    for (let i = 0; i < rowsAndCols; i++) {
      winningCombinations.push(
        Array.from({ length: rowsAndCols }, (_, j) => j * rowsAndCols + i)
      );
    }

    // Diagonals
    winningCombinations.push(
      Array.from({ length: rowsAndCols }, (_, i) => i * rowsAndCols + i)
    );
    winningCombinations.push(
      Array.from(
        { length: rowsAndCols },
        (_, i) => i * rowsAndCols + (rowsAndCols - 1 - i)
      )
    );

    return winningCombinations;
  }

  const winningCombinations = useMemo(() => {
    return calculateWinningCombinations();
  }, []);

  function checkWinner() {
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        gameBoard[a] &&
        gameBoard[a] === gameBoard[b] &&
        gameBoard[a] === gameBoard[c]
      ) {
        return gameBoard[a];
      }
    }

    return null;
  }

  const winner = checkWinner();
  const isDraw = !gameBoard.includes("");

  function clickCell(index) {
    if (!gameActive || gameBoard[index] !== "") return;

    setGameBoard((state) => {
      state[index] = currentPlayer;
      return state;
    });

    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  }

  function finishGame() {
    setGameActive(false);
  }

  function resetGame() {
    setGameActive(true);
    setGameBoard(initialBoard);
    setCurrentPlayer("X");
  }

  return {
    cells,
    winner,
    isDraw,
    gameBoard,
    clickCell,
    finishGame,
    resetGame
  };
}
