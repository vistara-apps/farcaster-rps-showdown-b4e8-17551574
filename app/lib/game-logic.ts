
import { Move, GameResult } from '../types/game'

export function determineWinner(move1: Move, move2: Move): GameResult {
  if (move1 === move2) {
    return {
      winner: 'tie',
      message: "It's a tie! Both players chose the same move."
    }
  }

  const winning = {
    rock: 'scissors',
    paper: 'rock',
    scissors: 'paper'
  }

  if (winning[move1] === move2) {
    return {
      winner: 'initiator',
      message: `${capitalizeMove(move1)} beats ${capitalizeMove(move2)}!`
    }
  }

  return {
    winner: 'opponent',
    message: `${capitalizeMove(move2)} beats ${capitalizeMove(move1)}!`
  }
}

export function capitalizeMove(move: Move): string {
  return move.charAt(0).toUpperCase() + move.slice(1)
}

export function getMoveEmoji(move: Move): string {
  const emojis = {
    rock: '🪨',
    paper: '📄',
    scissors: '✂️'
  }
  return emojis[move]
}

export function generateGameId(): string {
  return `game_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}
