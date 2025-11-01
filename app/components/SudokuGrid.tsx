"use client";

import { Grid } from "@/app/types";

interface SudokuGridProps {
  grid: Grid;
  selectedCell: { row: number; col: number } | null;
  onCellClick: (row: number, col: number) => void;
}

export default function SudokuGrid({
  grid,
  selectedCell,
  onCellClick,
}: SudokuGridProps) {
  return (
    <div style={styles.container}>
      <div style={styles.grid}>
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const isSelected =
              selectedCell?.row === rowIndex && selectedCell?.col === colIndex;

            const cellStyle = {
              ...styles.cell,
              ...(cell.isFixed && styles.cellFixed),
              ...(isSelected && styles.cellSelected),
              ...(cell.isError && styles.cellError),
              borderTop: "1px solid #444",
              borderLeft: "1px solid #444",
              borderRight:
                (colIndex + 1) % 3 === 0 && colIndex !== 8
                  ? "3px solid #1a1a1a"
                  : "1px solid #444",
              borderBottom:
                (rowIndex + 1) % 3 === 0 && rowIndex !== 8
                  ? "3px solid #1a1a1a"
                  : "1px solid #444",
            };

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                style={cellStyle}
                onClick={() => !cell.isFixed && onCellClick(rowIndex, colIndex)}
              >
                {cell.value !== 0 ? cell.value : ""}
              </div>
            );
          }),
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(10px)",
    padding: "20px",
    borderRadius: "16px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(9, 1fr)",
    gap: "0",
    background: "#2c2c2c",
    border: "3px solid #1a1a1a",
    width: "fit-content",
    margin: "0 auto", // Centrar
  },
  cell: {
    width: "clamp(35px, 8vw, 50px)", // Responsive: 35px en móvil, 50px en desktop
    height: "clamp(35px, 8vw, 50px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "clamp(1.2rem, 3vw, 1.5rem)", // Texto responsive
    fontWeight: "bold",
    cursor: "pointer",
    background: "white",
    color: "#2196F3",
    transition: "all 0.2s",
    userSelect: "none" as const,
  },
  cellFixed: {
    background: "#e8e8e8",
    color: "#000",
    fontWeight: 900,
    cursor: "default",
  },
  cellSelected: {
    background: "#ffd700",
  },
  cellError: {
    background: "#ffcccc",
    color: "#cc0000",
  },
};
