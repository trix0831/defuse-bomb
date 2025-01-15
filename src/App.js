import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  // The order in which the buttons are displayed on screen
  const displayedButtons = ["red", "orange", "yellow", "green", "blue", "purple"];
  
  // The correct sequence the user must follow
  const correctSequence = ["orange", "purple", "red", "green", "blue", "yellow"];
  
  // Tracks the user’s input sequence
  const [userSequence, setUserSequence] = useState([]);
  // Whether the game is over (win or lose)
  const [gameOver, setGameOver] = useState(false);
  // Outcome: "correct" or "wrong" (null while in progress)
  const [outcome, setOutcome] = useState(null);

  // Keep track of which button is currently "pressed" (for styling)
  const [pressedButton, setPressedButton] = useState(null);

  // A small helper to simulate button press effect
  const simulatePressEffect = (color) => {
    setPressedButton(color);
    // Remove the pressed state after a short delay (e.g., 100 ms)
    setTimeout(() => setPressedButton(null), 100);
  };

  // Handler for button clicks or simulated keyboard clicks
  const handleButtonClick = (color) => {
    if (gameOver) return; 
    // Show the press effect
    simulatePressEffect(color);

    // Append this click to userSequence
    const newSequence = [...userSequence, color];

    // Check correctness
    if (color === correctSequence[userSequence.length]) {
      // If user clicked the last required color, user wins
      if (newSequence.length === correctSequence.length) {
        setOutcome("correct");
        setGameOver(true);
      } else {
        // Otherwise, continue
        setUserSequence(newSequence);
      }
    } else {
      // Wrong color => bomb explodes
      setOutcome("wrong");
      setGameOver(true);
    }
  };

  // Handler for resetting the game
  const handleTryAgain = () => {
    setUserSequence([]);
    setGameOver(false);
    setOutcome(null);
  };

  // Keyboard event to trigger button click
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameOver) return; // If game is over, ignore

      switch (e.key.toLowerCase()) {
        case "a":
          handleButtonClick("red");
          break;
        case "s":
          handleButtonClick("orange");
          break;
        case "d":
          handleButtonClick("yellow");
          break;
        case "f":
          handleButtonClick("green");
          break;
        case "g":
          handleButtonClick("blue");
          break;
        case "h":
          handleButtonClick("purple");
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [gameOver, userSequence]);

  return (
    <div className="container">
      <h1>NTU SUNFLOWER</h1>
      <div style={{"color": "lightgray", "opacity": "0.8"}}>Can you solve it ...?</div>
      <div className="button-row">
        {displayedButtons.map((color) => (
          <button 
            key={color} 
            className={
              `color-btn ${color} ${pressedButton === color ? "pressed" : ""}`
            }
            onClick={() => handleButtonClick(color)}
          >
            {color}
          </button>
        ))}
      </div>

      {/* Outcome Dialog + Try Again Button */}
      {gameOver && (
        <div className="outcome-dialog">
          <div className={`outcome-message ${outcome === "correct" ? "flash-green" : "flash-red"}`}>
            {outcome === "correct" ? "CORRECT" : "WRONG"}
          </div>
          <button className="color-btn try-again" onClick={handleTryAgain}>
            Try Again
          </button>
        </div>
      )}
    <div class="pyramid-loader">
      <div class="wrapper">
        <span class="side side1"></span>
        <span class="side side2"></span>
        <span class="side side3"></span>
        <span class="side side4"></span>
        <span class="shadow"></span>
      </div>  
    </div>
    </div>
  );
}

export default App;
