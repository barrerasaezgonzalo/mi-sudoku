"use client";

import { useState, useEffect } from "react";
import SudokuGrid from "./components/SudokuGrid";
import ControlPanel from "./components/ControlPanel";
import Timer from "./components/Timer";
import Image from "next/image";
// import StatsPanel from "./components/StatsPanel";
import { Grid, Difficulty } from "./types";
import {
  getPuzzle,
  isValidMove,
  checkCompletion,
  countEmptyCells,
  getHint,
} from "./utils/sudoku";
import Link from "next/link";

export default function Home() {
  const [grid, setGrid] = useState<Grid>([]);
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [selectedCell, setSelectedCell] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [errors, setErrors] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [completed, setCompleted] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const styles = {
    container: {
      maxWidth: "1200px",
      width: "100%",
      margin: "0 auto",
      padding: "20px",
    },
    header: {
      textAlign: "center" as const,
      marginBottom: "30px",
    },
    title: {
      fontSize: "clamp(2rem, 5vw, 3rem)", // Responsive
      marginBottom: "10px",
      //textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
    },
    subtitle: {
      fontSize: "clamp(0.9rem, 2vw, 1.1rem)", // Responsive
      opacity: 0.9,
    },
    gameArea: {
      display: "flex",
      gap: "2rem",
      justifyContent: "center",
      flexWrap: "wrap" as const,
      marginBottom: "30px",
      flexDirection: isMobile ? "column" : ("row" as const), // Desktop: lado a lado
    },
    footer: {
      textAlign: "center" as const,
      padding: "2rem",
      opacity: 0.7,
      fontSize: "0.875rem",
      marginTop: "auto",
    },
    instructions: {
      background: "rgba(255, 255, 255, 0.15)",
      backdropFilter: "blur(10px)",
      padding: "20px",
      borderRadius: "12px",
      maxWidth: "600px",
      margin: "20px auto 0",
      textAlign: "left" as const,
    },
    instructionsTitle: {
      fontSize: "1.2rem",
      marginBottom: "10px",
      textAlign: "center" as const,
    },
    instructionsList: {
      listStyle: "none",
      padding: "0",
      margin: "0",
      fontSize: "0.95rem",
      lineHeight: "1.8",
    },
  } as const;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 820);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Inicializar juego
  useEffect(() => {
    startNewGame(difficulty);
    const savedCompleted = localStorage.getItem("sudokuCompleted");
    if (savedCompleted) {
      setCompleted(parseInt(savedCompleted));
    }
  }, []);

  // Iniciar nuevo juego
  const startNewGame = (diff: Difficulty) => {
    setGrid(getPuzzle(diff));
    setDifficulty(diff);
    setSelectedCell(null);
    setErrors(0);
    setIsComplete(false);
  };

  // Manejar click en celda
  const handleCellClick = (row: number, col: number) => {
    setSelectedCell({ row, col });
  };

  // Insertar número
  const handleNumberSelect = (num: number) => {
    if (!selectedCell || grid.length === 0) return;

    const { row, col } = selectedCell;
    if (grid[row][col].isFixed) return;

    const newGrid = [...grid];
    newGrid[row][col] = {
      ...newGrid[row][col],
      value: num,
      isError: !isValidMove(newGrid, row, col, num),
    };

    if (newGrid[row][col].isError) {
      setErrors((prev) => prev + 1);
    }

    setGrid(newGrid);

    // Verificar si se completó
    if (checkCompletion(newGrid, difficulty)) {
      setIsComplete(true);
      const newCompleted = completed + 1;
      setCompleted(newCompleted);
      localStorage.setItem("sudokuCompleted", newCompleted.toString());
      setTimeout(() => {
        alert("🎉 ¡Felicidades! ¡Completaste el Sudoku!");
      }, 300);
    }
  };

  // Obtener pista
  const handleHint = () => {
    if (grid.length === 0) return;
    const hint = getHint(grid, difficulty);
    if (!hint) return;

    const newGrid = [...grid];
    newGrid[hint.row][hint.col] = {
      value: hint.value,
      isFixed: false,
      isError: false,
    };
    setGrid(newGrid);
    setSelectedCell({ row: hint.row, col: hint.col });
  };

  // Borrar celda seleccionada
  const handleClear = () => {
    if (!selectedCell || grid.length === 0) return;
    const { row, col } = selectedCell;
    if (grid[row][col].isFixed) return;

    const newGrid = [...grid];
    newGrid[row][col] = {
      value: 0,
      isFixed: false,
      isError: false,
    };
    setGrid(newGrid);
  };

  // Verificar solución
  const handleCheck = () => {
    if (grid.length === 0) return;
    if (checkCompletion(grid, difficulty)) {
      alert("✅ ¡Correcto! El Sudoku está bien resuelto.");
    } else {
      alert("❌ Aún hay errores. Sigue intentando.");
    }
  };

  // Cambiar dificultad
  const handleDifficultyChange = (diff: Difficulty) => {
    startNewGame(diff);
  };

  const emptyCells = grid.length > 0 ? countEmptyCells(grid) : 0;
  // const filledCells = 81 - emptyCells;

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>
          <Image
            src={"/sudoku.png"}
            alt={"Sudoku"}
            width={100}
            height={100}
            style={{
              verticalAlign: "middle",
              marginRight: "2rem",
              marginBottom: "2rem",
            }}
          />
          SUDOKU
        </h1>
        <p style={styles.subtitle}>
          Completa el tablero con números del 1 al 9
        </p>

        <div style={styles.instructions}>
          <h3 style={styles.instructionsTitle}>📖 ¿Cómo jugar?</h3>
          <ul style={styles.instructionsList}>
            <li>Llena todas las casillas vacías con números del 1 al 9</li>
            <li>
              Cada <strong>fila</strong> debe tener los números del 1 al 9 sin
              repetir
            </li>
            <li>
              Cada <strong>columna</strong> debe tener los números del 1 al 9
              sin repetir
            </li>
            <li>
              Cada <strong>cuadrado de 3×3</strong> debe tener los números del 1
              al 9 sin repetir
            </li>
            <li>
              Los números en <strong>gris oscuro</strong> son fijos, no se
              pueden cambiar
            </li>
          </ul>
        </div>
      </header>

      <Timer isComplete={isComplete} errors={errors} />

      <div style={styles.gameArea}>
        <SudokuGrid
          grid={grid}
          selectedCell={selectedCell}
          onCellClick={handleCellClick}
        />

        <ControlPanel
          difficulty={difficulty}
          onDifficultyChange={handleDifficultyChange}
          onNumberSelect={handleNumberSelect}
          onHint={handleHint}
          onClear={handleClear}
          onCheck={handleCheck}
          onNewGame={() => startNewGame(difficulty)}
        />
      </div>

      {/* <StatsPanel
        completed={completed}
        emptyCells={emptyCells}
        filledCells={filledCells}
      /> */}

      <footer style={styles.footer}>
        <p>Creado a las 3 AM cuando el café ya no hacía efecto ☕💻</p>

        <Link href="https://chilehub.cl">
          <Image
            src="/chilehub.png"
            alt="Logo de Sopa de Letras"
            width={200}
            height={80}
            style={{
              width: "200px",
              height: "80px",
              objectFit: "contain",
              marginTop: "1rem",
            }}
          />
        </Link>
      </footer>
    </div>
  );
}
