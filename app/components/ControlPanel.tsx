"use client";

import { Difficulty } from "@/app/types";

interface ControlPanelProps {
  difficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onNumberSelect: (num: number) => void;
  onHint: () => void;
  onClear: () => void;
  onCheck: () => void;
  onNewGame: () => void;
}

export default function ControlPanel({
  difficulty,
  onDifficultyChange,
  onNumberSelect,
  onHint,
  onClear,
  onCheck,
  onNewGame,
}: ControlPanelProps) {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Controles</h2>

      {/* NÚMEROS PRIMERO */}
      <h3 style={styles.subtitle}>Números</h3>
      <div style={styles.numberPad}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            style={styles.numberBtn}
            onClick={() => onNumberSelect(num)}
          >
            {num}
          </button>
        ))}
      </div>

      {/* ACCIONES */}
      <h3 style={styles.subtitle}>Acciones</h3>
      <div style={styles.actionButtons}>
        <button
          style={{ ...styles.actionBtn, ...styles.btnHint }}
          onClick={onHint}
        >
          💡 Pista
        </button>
        <button
          style={{ ...styles.actionBtn, ...styles.btnClear }}
          onClick={onClear}
        >
          🗑️ Borrar
        </button>
        <button
          style={{ ...styles.actionBtn, ...styles.btnCheck }}
          onClick={onCheck}
        >
          ✓ Verificar
        </button>
        <button
          style={{ ...styles.actionBtn, ...styles.btnNew }}
          onClick={onNewGame}
        >
          🎲 Nuevo Juego
        </button>
      </div>

      {/* DIFICULTAD AL FINAL */}
      <h3 style={styles.subtitle}>Dificultad</h3>
      <div style={styles.difficultySelector}>
        <button
          style={{
            ...styles.difficultyBtn,
            ...(difficulty === "easy" && styles.difficultyBtnActive),
          }}
          onClick={() => onDifficultyChange("easy")}
        >
          Fácil
        </button>
        <button
          style={{
            ...styles.difficultyBtn,
            ...(difficulty === "medium" && styles.difficultyBtnActive),
          }}
          onClick={() => onDifficultyChange("medium")}
        >
          Medio
        </button>
        <button
          style={{
            ...styles.difficultyBtn,
            ...(difficulty === "hard" && styles.difficultyBtnActive),
          }}
          onClick={() => onDifficultyChange("hard")}
        >
          Difícil
        </button>
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
    minWidth: "250px",
  },
  title: {
    fontSize: "1.5rem",
    marginBottom: "20px",
    textAlign: "center" as const,
  },
  subtitle: {
    marginBottom: "10px",
    fontSize: "1rem",
    marginTop: "15px",
  },
  numberPad: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "8px",
    marginBottom: "20px",
  },
  numberBtn: {
    padding: "15px",
    border: "none",
    borderRadius: "8px",
    fontSize: "1.5rem",
    fontWeight: "bold",
    cursor: "pointer",
    background: "rgba(255, 255, 255, 0.2)",
    color: "white",
    transition: "all 0.2s",
  },
  actionButtons: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "10px",
    marginBottom: "20px",
  },
  actionBtn: {
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s",
    color: "white",
  },
  btnHint: {
    background: "#2196F3",
  },
  btnClear: {
    background: "#FF9800",
  },
  btnCheck: {
    background: "#4CAF50",
  },
  btnNew: {
    background: "#9C27B0",
  },
  difficultySelector: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "10px",
    marginBottom: "0",
  },
  difficultyBtn: {
    padding: "12px",
    border: "2px solid transparent",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s",
    background: "rgba(255, 255, 255, 0.2)",
    color: "white",
  },
  difficultyBtnActive: {
    background: "#4CAF50",
    border: "2px solid white",
  },
};
