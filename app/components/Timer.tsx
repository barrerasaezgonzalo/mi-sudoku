"use client";

import { useEffect, useState } from "react";
import { formatTime } from "@/app/utils/sudoku";

interface TimerProps {
  isComplete: boolean;
  errors: number;
}

export default function Timer({ isComplete, errors }: TimerProps) {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [bestTime, setBestTime] = useState<number | null>(null);

  // Cargar mejor tiempo
  useEffect(() => {
    const saved = localStorage.getItem("sudokuBestTime");
    if (saved) {
      setBestTime(parseInt(saved));
    }
  }, []);

  // Timer
  useEffect(() => {
    if (isComplete) return;

    const interval = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isComplete]);

  // Guardar mejor tiempo al completar
  useEffect(() => {
    if (isComplete && elapsedTime > 0) {
      if (bestTime === null || elapsedTime < bestTime) {
        setBestTime(elapsedTime);
        localStorage.setItem("sudokuBestTime", elapsedTime.toString());
      }
    }
  }, [isComplete, elapsedTime, bestTime]);

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <span style={styles.icon}>⏱️</span>
        <span style={styles.label}>Tiempo:</span>
        <span style={styles.value}>{formatTime(elapsedTime)}</span>
      </div>

      {bestTime !== null && (
        <div style={styles.box}>
          <span style={styles.icon}>🏆</span>
          <span style={styles.label}>Mejor:</span>
          <span style={styles.value}>{formatTime(bestTime)}</span>
        </div>
      )}

      <div style={styles.box}>
        <span style={styles.icon}>❌</span>
        <span style={styles.label}>Errores:</span>
        <span style={styles.value}>{errors}</span>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    gap: "1.5rem",
    justifyContent: "center",
    marginBottom: "20px",
    flexWrap: "wrap" as const,
  },
  box: {
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    padding: "1rem 1.5rem",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  icon: {
    fontSize: "1.5rem",
  },
  label: {
    opacity: 0.9,
    fontSize: "0.9rem",
  },
  value: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
};
