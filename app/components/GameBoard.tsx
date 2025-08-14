
"use client";

import { useState, useEffect } from "react";
import { MoveSelector } from "./MoveSelector";
import { StatusMessage } from "./StatusMessage";
import { FrameButton } from "./FrameButton";

interface GameBoardProps {
  gameId?: string;
  isInitiator?: boolean;
  onGameStart?: (opponentFid: string) => void;
  onMakeMove?: (move: "rock" | "paper" | "scissors") => void;
}

type GameStatus = "waiting" | "playing" | "finished";
type Move = "rock" | "paper" | "scissors";

interface GameState {
  gameId: string;
  initiatorFid: string;
  opponentFid: string;
  initiatorMove?: Move;
  opponentMove?: Move;
  status: GameStatus;
  winnerFid?: string;
}

export function GameBoard({ 
  gameId, 
  isInitiator, 
  onGameStart, 
  onMakeMove 
}: GameBoardProps) {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [selectedMove, setSelectedMove] = useState<Move | null>(null);
  const [opponentFid, setOpponentFid] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Simulate game state for demo
  useEffect(() => {
    if (gameId) {
      // In a real app, this would fetch from your backend/Supabase
      setGameState({
        gameId,
        initiatorFid: "123",
        opponentFid: "456",
        status: "playing"
      });
    }
  }, [gameId]);

  const handleStartGame = () => {
    if (!opponentFid.trim()) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      onGameStart?.(opponentFid);
      setIsLoading(false);
    }, 1000);
  };

  const handleMoveSelect = (move: Move) => {
    setSelectedMove(move);
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onMakeMove?.(move);
      setIsLoading(false);
    }, 1000);
  };

  const getGameResult = () => {
    if (!gameState?.initiatorMove || !gameState?.opponentMove) return null;
    
    const { initiatorMove, opponentMove } = gameState;
    
    if (initiatorMove === opponentMove) return "tie";
    
    const winConditions = {
      rock: "scissors",
      paper: "rock", 
      scissors: "paper"
    };
    
    return winConditions[initiatorMove] === opponentMove ? "initiator" : "opponent";
  };

  const result = getGameResult();

  if (!gameState && !gameId) {
    return (
      <div className="card space-y-4">
        <div className="display-text text-center">🎮 Start New Game</div>
        <div className="space-y-3">
          <div>
            <label className="body-text font-medium block mb-2">
              Opponent's FID:
            </label>
            <input
              type="text"
              value={opponentFid}
              onChange={(e) => setOpponentFid(e.target.value)}
              placeholder="Enter FID to challenge"
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <FrameButton
            onClick={handleStartGame}
            disabled={!opponentFid.trim() || isLoading}
            className="w-full"
          >
            {isLoading ? "Starting Game..." : "Challenge Player"}
          </FrameButton>
        </div>
      </div>
    );
  }

  if (gameState?.status === "waiting") {
    return (
      <div className="card space-y-4">
        <StatusMessage variant="info">
          Waiting for opponent to join the game...
        </StatusMessage>
        <div className="text-center caption-text">
          Game ID: {gameState.gameId}
        </div>
      </div>
    );
  }

  if (gameState?.status === "finished" || result) {
    const winningMove = result === "initiator" ? gameState?.initiatorMove : 
                      result === "opponent" ? gameState?.opponentMove : null;
    
    return (
      <div className="card space-y-6">
        <StatusMessage 
          variant={result === "tie" ? "info" : "success"}
        >
          {result === "tie" ? "It's a tie! 🤝" : 
           result === "initiator" ? "Initiator wins! 🎉" : 
           "Opponent wins! 🎉"}
        </StatusMessage>
        
        <MoveSelector
          selectedMove={null}
          onMoveSelect={() => {}}
          disabled={true}
          showResult={true}
          winningMove={winningMove}
        />
        
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="space-y-2">
            <div className="caption-text">Initiator</div>
            <div className="text-2xl">{gameState?.initiatorMove ? 
              (gameState.initiatorMove === "rock" ? "🪨" : 
               gameState.initiatorMove === "paper" ? "📄" : "✂️") : "?"}</div>
          </div>
          <div className="space-y-2">
            <div className="caption-text">Opponent</div>
            <div className="text-2xl">{gameState?.opponentMove ? 
              (gameState.opponentMove === "rock" ? "🪨" : 
               gameState.opponentMove === "paper" ? "📄" : "✂️") : "?"}</div>
          </div>
        </div>
        
        <FrameButton 
          variant="secondary" 
          className="w-full"
          onClick={() => window.location.reload()}
        >
          Play Again
        </FrameButton>
      </div>
    );
  }

  return (
    <div className="card space-y-6">
      <div className="text-center">
        <div className="display-text">🎮 RPS Showdown</div>
        <div className="caption-text mt-2">
          Game vs FID: {gameState?.opponentFid}
        </div>
      </div>
      
      {isLoading ? (
        <StatusMessage variant="info">
          Processing your move...
        </StatusMessage>
      ) : (
        <MoveSelector
          selectedMove={selectedMove}
          onMoveSelect={handleMoveSelect}
          disabled={isLoading}
        />
      )}
    </div>
  );
}
