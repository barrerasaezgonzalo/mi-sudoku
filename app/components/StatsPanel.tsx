"use client";

interface StatsPanelProps {
  completed: number;
  emptyCells: number;
  filledCells: number;
}

export default function StatsPanel({
  completed,
  emptyCells,
  filledCells,
}: StatsPanelProps) {
  const totalCells = 81;
  const accuracy =
    totalCells > 0 ? Math.round((filledCells / totalCells) * 100) : 0;

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>📊 Estadísticas</h3>
      <div style={styles.grid}>
        <div style={styles.statItem}>
          <span style={styles.statValue}>{completed}</span>
          <span style={styles.statLabel}>Completados</span>
        </div>
        <div style={styles.statItem}>
          <span style={styles.statValue}>{accuracy}%</span>
          <span style={styles.statLabel}>Progreso</span>
        </div>
        <div style={styles.statItem}>
          <span style={styles.statValue}>{filledCells}</span>
          <span style={styles.statLabel}>Celdas llenas</span>
        </div>
        <div style={styles.statItem}>
          <span style={styles.statValue}>{emptyCells}</span>
          <span style={styles.statLabel}>Restantes</span>
        </div>
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
    textAlign: "center" as const,
    maxWidth: "300px",
    margin: "0 auto",
  },
  title: {
    marginBottom: "15px",
    fontSize: "1.2rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px",
  },
  statItem: {
    background: "rgba(255, 255, 255, 0.1)",
    padding: "10px",
    borderRadius: "8px",
  },
  statValue: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    display: "block",
  },
  statLabel: {
    fontSize: "0.8rem",
    opacity: 0.8,
  },
};
