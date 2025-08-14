
export interface Game {
  gameId: string
  initiatorFid: string
  opponentFid: string | null
  initiatorMove: Move | null
  opponentMove: Move | null
  status: GameStatus
  winnerFid: string | null
  createdAt: string
  updatedAt: string
}

export interface PlayerStats {
  fid: string
  wins: number
  losses: number
  totalGames: number
}

export type Move = 'rock' | 'paper' | 'scissors'

export type GameStatus = 'waiting' | 'active' | 'completed'

export interface GameResult {
  winner: 'initiator' | 'opponent' | 'tie'
  message: string
}
