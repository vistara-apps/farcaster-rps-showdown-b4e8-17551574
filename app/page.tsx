"use client";

import {
  useMiniKit,
  useAddFrame,
  useOpenUrl,
} from "@coinbase/onchainkit/minikit";
import {
  Name,
  Identity,
  Address,
  Avatar,
  EthBalance,
} from "@coinbase/onchainkit/identity";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import { useEffect, useMemo, useState, useCallback } from "react";
import { GameBoard } from "./components/GameBoard";
import { Leaderboard } from "./components/Leaderboard";
import { Home } from "./components/Home";

export default function App() {
  const { setFrameReady, isFrameReady, context } = useMiniKit();
  const [frameAdded, setFrameAdded] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [currentGameId, setCurrentGameId] = useState<string | undefined>(undefined);

  const addFrame = useAddFrame();
  const openUrl = useOpenUrl();

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  const handleAddFrame = useCallback(async () => {
    const frameAdded = await addFrame();
    setFrameAdded(Boolean(frameAdded));
  }, [addFrame]);

  const handleGameStart = useCallback((gameId: string) => {
    setCurrentGameId(gameId);
    setActiveTab("game");
  }, []);

  const handleMakeMove = useCallback(async (move: string) => {
    if (!currentGameId) return;
    
    try {
      const response = await fetch('/api/game/move', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gameId: currentGameId,
          move,
          fid: context?.user?.fid,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to make move');
      }

      const result = await response.json();
      console.log('Move result:', result);
    } catch (error) {
      console.error('Error making move:', error);
    }
  }, [currentGameId, context?.user?.fid]);

  const saveFrameButton = useMemo(() => {
    if (context && !context.client.added) {
      return (
        <button
          onClick={handleAddFrame}
          className="flex items-center space-x-1 px-3 py-1.5 text-sm font-medium text-primary bg-surface border border-primary/20 rounded-md hover:bg-primary/5 transition-colors"
        >
          <span className="text-lg">+</span>
          <span>Save Frame</span>
        </button>
      );
    }

    if (frameAdded) {
      return (
        <div className="flex items-center space-x-1 text-sm font-medium text-green-600 animate-fade-in">
          <span className="text-lg">✓</span>
          <span>Saved</span>
        </div>
      );
    }

    return null;
  }, [context, frameAdded, handleAddFrame]);

  const navigationTabs = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "game", label: "Game", icon: "🎮" },
    { id: "leaderboard", label: "Leaderboard", icon: "🏆" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-bg text-text-primary">
      <div className="container mx-auto">
        <header className="flex justify-between items-center mb-6 h-16 px-4">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">✂️</div>
            <h1 className="heading text-primary">RPS Showdown</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <Wallet className="z-10">
              <ConnectWallet>
                <Name className="text-inherit" />
              </ConnectWallet>
              <WalletDropdown>
                <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                  <Avatar />
                  <Name />
                  <Address />
                  <EthBalance />
                </Identity>
                <WalletDropdownDisconnect />
              </WalletDropdown>
            </Wallet>
            {saveFrameButton}
          </div>
        </header>

        <nav className="flex justify-center mb-6">
          <div className="flex bg-surface rounded-lg p-1 shadow-card">
            {navigationTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-base ${
                  activeTab === tab.id
                    ? "bg-primary text-white shadow-sm"
                    : "text-text-secondary hover:text-text-primary hover:bg-bg"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </nav>

        <main className="flex-1 px-4">
          {activeTab === "home" && (
            <Home 
              onStartGame={handleGameStart}
              setActiveTab={setActiveTab}
            />
          )}
          {activeTab === "game" && (
            <GameBoard
              gameId={currentGameId}
              onGameStart={handleGameStart}
              onMakeMove={handleMakeMove}
            />
          )}
          {activeTab === "leaderboard" && (
            <Leaderboard />
          )}
        </main>

        <footer className="mt-8 pt-4 pb-6 flex justify-center">
          <button
            onClick={() => openUrl("https://base.org/builders/minikit")}
            className="text-text-secondary text-xs hover:text-text-primary transition-colors"
          >
            Built on Base with MiniKit
          </button>
        </footer>
      </div>
    </div>
  );
}
