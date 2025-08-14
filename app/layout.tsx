
import type { Metadata, Viewport } from "next";
import "./globals.css";
import "@coinbase/onchainkit/styles.css";
import { Providers } from "./providers";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Farcaster RPS Showdown",
  description: "Challenge your Farcaster friends to Rock, Paper, Scissors right in your feed.",
  other: {
    "fc:frame": JSON.stringify({
      version: "next",
      imageUrl: process.env.NEXT_PUBLIC_APP_HERO_IMAGE || "https://i.imgur.com/placeholder.png",
      button: {
        title: "Launch Farcaster RPS Showdown",
        action: {
          type: "launch_frame",
          name: "Farcaster RPS Showdown",
          url: process.env.NEXT_PUBLIC_URL || "http://localhost:3000",
          splashImageUrl: process.env.NEXT_PUBLIC_SPLASH_IMAGE || "https://i.imgur.com/placeholder-splash.png",
          splashBackgroundColor: process.env.NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR || "#4F46E5",
        },
      },
    }),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
