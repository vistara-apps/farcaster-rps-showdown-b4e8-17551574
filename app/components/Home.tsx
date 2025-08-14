"use client";

import { useState } from "react";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { StatusMessage } from "./ui/StatusMessage";

interface HomeProps {
  setActiveTab: (tab: string) => void;
}

export function Home({ setActiveTab }: HomeProps) {
  const [isCreatingGame, setIsCreatingGame] = useState(false);
  const [gameCode, setGameCode] = useState("");

  const handleCreateGame = async () => {
    setIsCreatingGame(true);
    // Simulate game creation
    setTimeout(() => {
      setGameCode("RPS" + Math.random().toString(36).substr(2, 6).toUpperCase());
      setIsCreatingGame(false);
    }, 1000);
  };

  const handleJoinGame = () => {
    setActiveTab("game");
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-semibold text-primary">
          RPS Showdown
        </h1>
        <p className="text-base leading-7 text-secondary">
          Challenge your Farcaster friends to Rock, Paper, Scissors
        </p>
      </div>

      <div className="grid gap-4">
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Quick Start</h2>
          <div className="space-y-4">
            <Button
              variant="primary"
              onClick={handleCreateGame}
              disabled={isCreatingGame}
              className="w-full"
            >
              {isCreatingGame ? "Creating..." : "Create New Game"}
            </Button>
            
            {gameCode && (
              <StatusMessage variant="success">
                Game created! Code: {gameCode}
              </StatusMessage>
            )}

            <div className="text-center text-sm text-secondary">or</div>

            <Button
              variant="secondary"
              onClick={handleJoinGame}
              className="w-full"
            >
              Join Existing Game
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">How to Play</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
                1
              </div>
              <p>Create a game or join with a friend's code</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
                2
              </div>
              <p>Choose Rock, Paper, or Scissors</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
                3
              </div>
              <p>See who wins and climb the leaderboard!</p>
            </div>
          </div>
        </Card>

        <div className="flex space-x-2">
          <Button
            variant="secondary"
            onClick={() => setActiveTab("leaderboard")}
            className="flex-1"
          >
            View Leaderboard
          </Button>
          <Button
            variant="secondary"
            onClick={() => setActiveTab("stats")}
            className="flex-1"
          >
            My Stats
          </Button>
        </div>
      </div>
    </div>
  );
}
