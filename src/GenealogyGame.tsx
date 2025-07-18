import React, { useEffect, useState } from "react";
import { ModeSelector } from "./components/ModeSelector";
import { difficultyConfig, genealogy, type Mode } from "./constants";
import { darkStyles, lightStyles, styles, themeToggleButton } from "./styles";

export default function GenealogyGame() {
  const [mode, setMode] = useState<Mode | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState("");
  const [completed, setCompleted] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [lives, setLives] = useState(3);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [gameOver, setGameOver] = useState(false);
  const [fastestTime, setFastestTime] = useState<number | null>(null);
  const [longestStreak, setLongestStreak] = useState<number>(0);
  const [darkMode, setDarkMode] = useState(false);
  const [hardTimer, setHardTimer] = useState(2); // Hard mode countdown

  const config = mode ? difficultyConfig[mode] : null;

  // Load highscores + dark mode preference
  useEffect(() => {
    const savedTime = localStorage.getItem("genealogy_fastest_time");
    const savedStreak = localStorage.getItem("genealogy_longest_streak");
    const savedTheme = localStorage.getItem("genealogy_dark_mode");
    if (savedTime) setFastestTime(parseFloat(savedTime));
    if (savedStreak) setLongestStreak(parseInt(savedStreak));
    if (savedTheme === "true") setDarkMode(true);
  }, []);

  // Timer for full completion
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (startTime && !gameOver && currentIndex < genealogy.length) {
      timer = setInterval(() => {
        setTimeElapsed(Date.now() - startTime);
      }, 100);
    }
    return () => clearInterval(timer);
  }, [startTime, gameOver, currentIndex]);

  // Extreme mode per-name countdown
  useEffect(() => {
    if (mode !== "extreme" || gameOver || currentIndex >= genealogy.length) return;

    setHardTimer(2); // reset countdown each new name
    const countdown = setInterval(() => {
      setHardTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          handleGameOver(`⏱ Time's up! The answer was "${genealogy[currentIndex]}".`);
        }
        return prev - 1;
      });
    }, 1000);


    return () => clearInterval(countdown);
  }, [currentIndex, mode, gameOver]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!startTime) setStartTime(Date.now());

    const expected = genealogy[currentIndex];
    const guess = input.trim().toLowerCase();

    if (guess === expected.toLowerCase()) {
      setCompleted([...completed, expected]);
      setCurrentIndex(currentIndex + 1);
      setInput("");
      setError("");

      // If completed everything
      if (currentIndex + 1 === genealogy.length) {
        const finishTime = Date.now() - (startTime || Date.now());
        setTimeElapsed(finishTime);
        setGameOver(true);

        // Save fastest completion if better
        if (!fastestTime || finishTime < fastestTime) {
          setFastestTime(finishTime);
          localStorage.setItem("genealogy_fastest_time", finishTime.toString());
        }

        // Save longest streak (full completion)
        if (genealogy.length > longestStreak) {
          setLongestStreak(genealogy.length);
          localStorage.setItem("genealogy_longest_streak", genealogy.length.toString());
        }
      }
    } else {
      // Wrong answer: lose a life
      if ((lives - 1) > 0) {
        setInput("");
        setLives(lives - 1);
        setError(`❌ Wrong! The correct was "${expected}". Lives left: ${lives - 1}`);
      } else {
        handleGameOver(`❌ Wrong! No lives left. The correct was "${expected}".`);
      }
    }
  };

  const handleGameOver = (msg: string) => {
    setError(msg);
    setGameOver(true);

    // Save longest streak if better
    if (completed.length > longestStreak) {
      setLongestStreak(completed.length);
      localStorage.setItem("genealogy_longest_streak", completed.length.toString());
    }
  };

  const resetGame = () => {
    setCompleted([]);
    setCurrentIndex(0);
    setInput("");
    setError("");
    setStartTime(null);
    setTimeElapsed(0);
    setGameOver(false);
    setHardTimer(2);
    setLives(config?.lives || 3);
  };

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSec = seconds % 60;
    return `${minutes}:${remainingSec.toString().padStart(2, "0")}.${Math.floor((ms % 1000) / 100)}`;
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("genealogy_dark_mode", newMode.toString());
  };

  const isFinished = currentIndex >= genealogy.length;

  // Dynamic theme
  const theme = darkMode ? darkStyles : lightStyles;

  // ✅ Show a hint in Easy Mode
  const getHint = () => {
    const hintType = config?.hint;
    const expected = genealogy[currentIndex];
    if (hintType === "full") {
      return expected; // Full hint shows the full name
    }
    else if (hintType === "letters") {
      // Show first 2 letters + last letter
      return expected.slice(0, 2) + "…";
    }
    return;
  };

  if (!mode) {
    return (
      <ModeSelector
        setMode={(selectedMode) => {
          setMode(selectedMode as Mode);
          resetGame(); // Reset game when mode is selected
        }}
        toggleDarkMode={toggleDarkMode}
        darkMode={darkMode}
      />
    )
  }

  return (
    <div style={{ ...styles.container, ...theme.background }}>
      <h1 style={{ ...styles.title, ...theme.text }}>
        📜 Genealogy Game - {mode.toUpperCase()} Mode
      </h1>

      {/* Dark Mode Toggle */}
      <div>
        <button onClick={toggleDarkMode} style={themeToggleButton(theme)}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
        <button onClick={() => setMode(null)} style={{ ...styles.resetButton, ...theme.button }}>
          🔙 Change Difficulty
        </button>
      </div>

      {/* High Score Display */}
      <div style={{ ...styles.highScoreBox, ...theme.card }}>
        <p>🏆 Longest Streak: <strong>{longestStreak}</strong></p>
        {fastestTime && <p>⏱ Fastest: <strong>{formatTime(fastestTime)}</strong></p>}
        <p>❤️ Lives: <strong>{lives}</strong></p>
      </div>

      {/* Completed Names */}
      {completed.length > 0 && (
        <div style={styles.completedBox}>
          {completed.map((name, idx) => (
            <span key={idx} style={{ ...styles.completedName, ...theme.completed }}>
              {name}
            </span>
          ))}
        </div>
      )}

      {/* Timer hint for Extreme Mode */}
      {mode === "extreme" && !gameOver && <p style={{ color: "red" }}>⏳ {hardTimer}s left!</p>}

      {/* Hint for Easy Mode */}
      {(mode === "easy" || mode === "baby") 
        && !gameOver && 
          <p style={{ color: "green" }}>
            💡 Hint: {getHint()}
          </p>
          }

      {/* Input + Submit */}
      {!gameOver ? (
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Next name (#${currentIndex + 1})`}
            style={{ ...styles.input, ...theme.input }}
            autoFocus
          />
          <button type="submit" style={{ ...styles.button, ...theme.button }}>
            ✅ Submit
          </button>
        </form>
      ) : (
        <div style={styles.gameOverBox}>
          {isFinished ? (
            <p style={{ color: "green" }}>
              🎉 You finished in <strong>{formatTime(timeElapsed)}</strong>!
            </p>
          ) : (
            <p style={{ color: "red" }}>{error}</p>
          )}
          <button onClick={resetGame} style={{ ...styles.resetButton, ...theme.button }}>
            🔄 Play Again
          </button>
        </div>
      )}

      {/* Progress Info */}
      {error && !gameOver &&<p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      <p style={{ marginTop: "20px", fontSize: "14px" }}>
        Progress: {completed.length}/{genealogy.length}
      </p>
      {startTime && !gameOver && (
        <p style={{ fontSize: 14, ...theme.subText }}>
          Time: {formatTime(timeElapsed)}
        </p>
      )}
    </div>
  );
}