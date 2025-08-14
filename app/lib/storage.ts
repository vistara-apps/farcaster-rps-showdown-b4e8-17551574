
import { Game, PlayerStats } from '../types/game'

// Mock storage implementation - in production, use Supabase
class MockStorage {
  private games: Map<string, Game> = new Map()
  private playerStats: Map<string, PlayerStats> = new Map()

  async createGame(game: Game): Promise<Game> {
    this.games.set(game.gameId, game)
    return game
  }

  async getGame(gameId: string): Promise<Game | null> {
    return this.games.get(gameId) || null
  }

  async updateGame(gameId: string, updates: Partial<Game>): Promise<Game | null> {
    const game = this.games.get(gameId)
    if (!game) return null

    const updatedGame = { ...game, ...updates, updatedAt: new Date().toISOString() }
    this.games.set(gameId, updatedGame)
    return updatedGame
  }

  async getPlayerStats(fid: string): Promise<PlayerStats> {
    let stats = this.playerStats.get(fid)
    if (!stats) {
      stats = { fid, wins: 0, losses: 0, totalGames: 0 }
      this.playerStats.set(fid, stats)
    }
    return stats
  }

  async updatePlayerStats(fid: string, updates: Partial<PlayerStats>): Promise<PlayerStats> {
    const stats = await this.getPlayerStats(fid)
    const updatedStats = { ...stats, ...updates }
    this.playerStats.set(fid, updatedStats)
    return updatedStats
  }

  async getLeaderboard(limit: number = 10): Promise<PlayerStats[]> {
    return Array.from(this.playerStats.values())
      .filter(stats => stats.totalGames > 0)
      .sort((a, b) => {
        const aWinRate = a.totalGames > 0 ? a.wins / a.totalGames : 0
        const bWinRate = b.totalGames > 0 ? b.wins / b.totalGames : 0
        if (aWinRate !== bWinRate) return bWinRate - aWinRate
        return b.wins - a.wins
      })
      .slice(0, limit)
  }

  async getUserGames(fid: string): Promise<Game[]> {
    return Array.from(this.games.values())
      .filter(game => game.initiatorFid === fid || game.opponentFid === fid)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }
}

export const storage = new MockStorage()
