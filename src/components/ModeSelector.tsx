import { styles, modeButton, themeToggleButton, darkStyles, lightStyles } from '../styles';

interface ModeSelectorProps {
    setMode: (mode: string) => void;
    toggleDarkMode: () => void;
    darkMode: boolean;
}

export const ModeSelector = (props: ModeSelectorProps) => {
    const { setMode, toggleDarkMode, darkMode } = props;
    const theme = darkMode ? darkStyles : lightStyles;

    return (
      <div style={{ ...styles.container, ...theme.background }}>
        <h1 style={{ ...styles.title, ...theme.text }}>📜 Genealogy Game</h1>
        <p style={{ ...styles.subtitle, ...theme.subText }}>
          Choose your game mode:
        </p>
        <button onClick={() => setMode("easy")} style={modeButton("#4CAF50")}>
          🟢 Easy (with hints)
        </button>
        <button onClick={() => setMode("normal")} style={modeButton("#007BFF")}>
          🔵 Normal
        </button>
        <button onClick={() => setMode("hard")} style={modeButton("#FF4444")}>
          🔴 Hard (2 sec per name)
        </button>

        {/* Dark Mode Toggle */}
        <div style={{ margin: 20 }}>
          <button onClick={toggleDarkMode} style={themeToggleButton(theme)}>
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
      </div>
    );
}