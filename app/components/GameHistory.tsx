
'use client'

import { useState, useEffect } from 'react'
import { Game } from '../types/game'
import { getMoveEmoji, capitalizeMove } from '../lib/game-logic'
import { storage } from '../lib/storage'

interface GameHistoryProps {
  userFid: string
}

export function GameHistory({ userFid }: GameHistoryProps) {
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const userGames = await storage.getUserGames(userFid)
        setGames(userGames)
      } catch (error) {
        console.error('Failed to load game history:', error)
      } finally {
        setLoading(false)
      }
    }

    loadHistory()
  }, [userFid])

  if (loading) {
    return (
      <div className="card text-center">
        <div className="text-heading">Loading history...</div>
      </div>
    )
  }

  if (games.length === 0) {
    return (
      <div className="card text-center">
        <div className="text-heading mb-4">No Games Yet</div>
        <p className="text-body text-text-secondary">
          Your game history will appear here after you play your first game.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="text-display text-center mb-6">📜 Game History</div>
      {games.map((game) => {
        const isInitiator = game.initiatorFid === userFid
        const userMove = isInitiator ? game.initiatorMove : game.opponentMove
        const opponentMove = isInitiator ? game.opponentMove : game.initiatorMove
        const isWinner = game.winnerFid === userFid
        const isTie = game.winnerFid === null && game.status === 'completed'

        return (
          <div key={game.gameId} className="card">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl">
                    {userMove ? getMoveEmoji(userMove) : '❓'}
                  </div>
                  <div className="text-caption">You</div>
                </div>
                <div className="text-lg">VS</div>
                <div className="text-center">
                  <div className="text-2xl">
                    {opponentMove ? getMoveEmoji(opponentMove) : '❓'}
                  </div>
                  <div className="text-caption">Opponent</div>
                </div>
              </div>
              <div className="text-right">
                {game.status === 'completed' && (
                  <div className={`font-semibold ${
                    isTie ? 'text-yellow-600' : 
                    isWinner ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {isTie ? 'TIE' : isWinner ? 'WIN' : 'LOSS'}
                  </div>
                )}
                {game.status !== 'completed' && (
                  <div className="text-text-secondary text-sm">
                    {game.status === 'waiting' ? 'Waiting' : 'Active'}
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
