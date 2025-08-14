
# Farcaster RPS Showdown

Challenge your Farcaster friends to Rock, Paper, Scissors right in your feed.

## Features

- **In-Feed RPS Challenges**: Start games directly in Farcaster with frame interactions
- **Move Selection & Outcome Display**: Interactive buttons for Rock, Paper, Scissors moves
- **Basic Leaderboard Integration**: Track win/loss records and player rankings
- **MiniKit Integration**: Seamless wallet connection and Base Account features

## How to Play

1. **Connect Wallet**: Use the "Sign in with Base" button to connect your wallet
2. **Start Game**: Enter an opponent's FID to challenge them to Rock, Paper, Scissors
3. **Make Moves**: Select Rock, Paper, or Scissors using the interactive buttons
4. **View Results**: See the outcome and check your stats on the leaderboard
5. **Play Again**: Challenge new opponents or rematch previous players

## Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Web3**: Coinbase OnchainKit with MiniKit integration
- **Blockchain**: Base (Ethereum L2)
- **Authentication**: Base Account with wallet connection

## Design System

The app implements a cohesive design system with:

- **Colors**: Primary blue, accent cyan, clean surface backgrounds
- **Typography**: Display, heading, body, and caption text styles
- **Components**: Reusable FrameButton, PlayerCard, MoveSelector, and StatusMessage
- **Animations**: Smooth transitions and micro-interactions
- **Layout**: Responsive grid with consistent spacing

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Environment Variables

Create a `.env.local` file with:

```
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_api_key
NEXT_PUBLIC_URL=your_app_url
NEXT_PUBLIC_ICON_URL=your_icon_url
NEXT_PUBLIC_APP_HERO_IMAGE=your_hero_image_url
NEXT_PUBLIC_SPLASH_IMAGE=your_splash_image_url
NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR=#4F46E5
```

## Next Steps

To make this a fully functional Farcaster Frame:

1. **Backend API**: Implement Supabase or similar database for game state
2. **Farcaster Integration**: Add webhook handlers for frame interactions
3. **Real-time Updates**: Implement game state synchronization
4. **Enhanced Leaderboard**: Add more statistics and filtering options
5. **Tournament Mode**: Create brackets and competitive play

## License

MIT License - see LICENSE file for details.
