
"use client";

interface PlayerCardProps {
  fid: string;
  username?: string;
  wins: number;
  losses: number;
  variant?: "default" | "leaderboard";
  rank?: number;
}

export function PlayerCard({ 
  fid, 
  username, 
  wins, 
  losses, 
  variant = "default",
  rank 
}: PlayerCardProps) {
  const totalGames = wins + losses;
  const winRate = totalGames > 0 ? Math.round((wins / totalGames) * 100) : 0;
  
  return (
    <div className={`card ${variant === "leaderboard" ? "border-l-4 border-l-accent" : ""} animate-fade-in`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {variant === "leaderboard" && rank && (
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
              {rank}
            </div>
          )}
          <div>
            <div className="heading-text">
              {username || `User ${fid}`}
            </div>
            <div className="caption-text">
              FID: {fid}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="body-text font-semibold text-primary">
            {winRate}% Win Rate
          </div>
          <div className="caption-text">
            {wins}W - {losses}L
          </div>
        </div>
      </div>
    </div>
  );
}
