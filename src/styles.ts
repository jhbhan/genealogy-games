
// ✅ Base styles
const styles: Record<string, React.CSSProperties> = {
  container: {
    fontFamily: "'Segoe UI', sans-serif",
    padding: 20,
    maxWidth: 700,
    margin: "auto",
    textAlign: "center",
    transition: "all 0.3s ease",
  },
  title: { fontSize: 32, marginBottom: 8 },
  subtitle: { marginBottom: 20 },
  highScoreBox: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  completedBox: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
    marginBottom: "10px",
    justifyContent: "center",
  },
  completedName: {
    padding: "5px 8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  form: { display: "flex", justifyContent: "center", gap: 8, marginBottom: 12 },
  input: {
    padding: "10px",
    width: "60%",
    fontSize: "16px",
    borderRadius: 6,
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 15px",
    fontSize: "16px",
    borderRadius: 6,
    border: "none",
    cursor: "pointer",
    transition: "background 0.2s",
  },
  gameOverBox: { marginTop: 20 },
  resetButton: {
    marginTop: 10,
    padding: "10px 15px",
    fontSize: 16,
    borderRadius: 6,
    cursor: "pointer",
  },
};

// ✅ Light theme
const lightStyles = {
  background: { background: "#fdfdfd", color: "#000" },
  text: { color: "#222" },
  subText: { color: "#555" },
  card: { background: "#f3f3f3" },
  completed: { background: "#e0ffe0", border: "1px solid #ccc" },
  input: { background: "#fff", color: "#000" },
  button: { background: "#4CAF50", color: "#fff" },
};

// ✅ Dark theme
const darkStyles = {
  background: { background: "#1e1e1e", color: "#fff" },
  text: { color: "#fff" },
  subText: { color: "#bbb" },
  card: { background: "#2a2a2a" },
  completed: { background: "#334d33", border: "1px solid #555" },
  input: { background: "#333", color: "#fff", border: "1px solid #555" },
  button: { background: "#555", color: "#fff" },
};

// ✅ Mode selection buttons
const modeButton = (color: string): React.CSSProperties => ({
  display: "block",
  width: "200px",
  margin: "10px auto",
  padding: "12px",
  borderRadius: "8px",
  fontSize: "18px",
  fontWeight: "bold",
  color: "#fff",
  background: color,
  border: "none",
  cursor: "pointer",
});

// ✅ Dark/Light toggle button
const themeToggleButton = (theme: typeof lightStyles | typeof darkStyles) => ({
  marginTop: 10,
  padding: "8px 12px",
  borderRadius: 6,
  border: "none",
  cursor: "pointer",
  background: theme === darkStyles ? "#444" : "#ddd",
  color: theme === darkStyles ? "#fff" : "#000",
  transition: "background 0.3s",
  margin: "12px"
});

export { styles, lightStyles, darkStyles, modeButton, themeToggleButton };