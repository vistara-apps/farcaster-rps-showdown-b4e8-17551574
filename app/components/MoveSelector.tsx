
"use client";

interface MoveSelectorProps {
  selectedMove?: "rock" | "paper" | "scissors" | null;
  onMoveSelect: (move: "rock" | "paper" | "scissors") => void;
  disabled?: boolean;
  showResult?: boolean;
  winningMove?: "rock" | "paper" | "scissors" | null;
}

const moveEmojis = {
  rock: "🪨",
  paper: "📄", 
  scissors: "✂️"
};

export function MoveSelector({ 
  selectedMove, 
  onMoveSelect, 
  disabled = false,
  showResult = false,
  winningMove
}: MoveSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="heading-text text-center">
        {showResult ? "Game Result" : "Choose Your Move"}
      </div>
      <div className="flex justify-center space-x-4">
        {(["rock", "paper", "scissors"] as const).map((move) => (
          <button
            key={move}
            className={`move-button ${
              selectedMove === move ? "selected" : ""
            } ${
              showResult && winningMove === move ? "winner" : ""
            }`}
            onClick={() => onMoveSelect(move)}
            disabled={disabled || showResult}
          >
            {moveEmojis[move]}
          </button>
        ))}
      </div>
      <div className="flex justify-center space-x-8 caption-text">
        <span>Rock</span>
        <span>Paper</span>
        <span>Scissors</span>
      </div>
    </div>
  );
}
