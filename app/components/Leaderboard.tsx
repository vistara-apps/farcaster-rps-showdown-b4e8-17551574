
"use client";

import { useState, useEffect } from "react";
import { PlayerCard } from "./PlayerCard";
import { FrameButton } from "./FrameButton";

interface PlayerStats {
  fid: string;
  username?: string;
  wins: number;
  losses: number;
  totalGames: number;
}

export function Leaderboard() {
  const [players, setPlayers] = useState<PlayerStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading leaderboard data
    setTimeout(() => {
      setPlayers([
        { fid: "123", username: "alice", wins: 15, losses: 3, totalGames: 18 },
        { fid: "456", username: "bob", wins: 12, losses: 5, totalGames: 17 },
        { fid: "789", username: "charlie", wins: 8, losses: 4, totalGames: 12 },
        { fid: "101", username: "diana", wins: 6, losses: 6, totalGames: 12 },
        { fid: "202", username: "eve", wins: 3, losses: 9, totalGames: 12 },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const sortedPlayers = players
    .sort((a, b) => {
      const aWinRate = a.totalGames > 0 ? a.wins / a.totalGames : 0;
      const bWinRate = b.totalGames > 0 ? b.wins / b.totalGames : 0;
      return bWinRate - aWinRate;
    })
    .slice(0, 10);

  if (isLoading) {
    return (
      <div className="card">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="card">
        <div className="display-text text-center mb-6">🏆 Leaderboard</div>
        <div className="space-y-3">
          {sortedPlayers.map((player, index) => (
            <PlayerCard
              key={player.fid}
              fid={player.fid}
              username={player.username}
              wins={player.wins}
              losses={player.losses}
              variant="leaderboard"
              rank={index + 1}
            />
          ))}
        </div>
      </div>
      
      <FrameButton 
        variant="secondary" 
        className="w-full"
        onClick={() => window.location.reload()}
      >
        Refresh Leaderboard
      </FrameButton>
    </div>
  );
}
