import { Grid, Cell, Difficulty } from "@/app/types";
import { PUZZLES, SOLUTIONS } from "@/app/constants/puzzles";

// Crear grid inicial desde un puzzle
export function createGridFromPuzzle(puzzle: number[][]): Grid {
  return puzzle.map((row) =>
    row.map((value) => ({
      value,
      isFixed: value !== 0,
      isError: false,
    })),
  );
}

// Obtener un puzzle según dificultad
export function getPuzzle(difficulty: Difficulty): Grid {
  return createGridFromPuzzle(PUZZLES[difficulty]);
}

// Verificar si un número es válido en una posición
export function isValidMove(
  grid: Grid,
  row: number,
  col: number,
  num: number,
): boolean {
  // Verificar fila
  for (let x = 0; x < 9; x++) {
    if (x !== col && grid[row][x].value === num) {
      return false;
    }
  }

  // Verificar columna
  for (let x = 0; x < 9; x++) {
    if (x !== row && grid[x][col].value === num) {
      return false;
    }
  }

  // Verificar cuadrado 3x3
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const currentRow = startRow + i;
      const currentCol = startCol + j;
      if (
        (currentRow !== row || currentCol !== col) &&
        grid[currentRow][currentCol].value === num
      ) {
        return false;
      }
    }
  }

  return true;
}

// Verificar si el puzzle está completo y correcto
export function checkCompletion(grid: Grid, difficulty: Difficulty): boolean {
  const solution = SOLUTIONS[difficulty];

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col].value !== solution[row][col]) {
        return false;
      }
    }
  }

  return true;
}

// Contar celdas vacías
export function countEmptyCells(grid: Grid): number {
  let count = 0;
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col].value === 0) {
        count++;
      }
    }
  }
  return count;
}

// Obtener una pista (celda vacía con su solución)
export function getHint(
  grid: Grid,
  difficulty: Difficulty,
): { row: number; col: number; value: number } | null {
  const solution = SOLUTIONS[difficulty];
  const emptyCells: { row: number; col: number }[] = [];

  // Encontrar todas las celdas vacías
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col].value === 0) {
        emptyCells.push({ row, col });
      }
    }
  }

  if (emptyCells.length === 0) return null;

  // Elegir una celda aleatoria
  const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  return {
    row: randomCell.row,
    col: randomCell.col,
    value: solution[randomCell.row][randomCell.col],
  };
}

// Formatear tiempo (segundos a MM:SS)
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}
