export type Cell = {
  value: number; // 0 = vacío, 1-9 = número
  isFixed: boolean; // true = número original del puzzle
  isError: boolean; // true = número incorrecto
};

export type Grid = Cell[][];

export type Difficulty = "easy" | "medium" | "hard";

export interface SudokuState {
  grid: Grid;
  selectedCell: { row: number; col: number } | null;
  errors: number;
  isComplete: boolean;
  difficulty: Difficulty;
}
