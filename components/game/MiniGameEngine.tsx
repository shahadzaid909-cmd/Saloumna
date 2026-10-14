'use client';

import React from 'react';
import { Region } from '../../../data/regions';
import BuilderGame from './BuilderGame';
import LetterAssemblyGame from './LetterAssemblyGame';
import MatchingGame from './MatchingGame';

interface MiniGameEngineProps {
  region: Region;
  onComplete: () => void;
}

export default function MiniGameEngine({ region, onComplete }: MiniGameEngineProps) {
  const { gameType, gameConfig } = region.gamePayload;

  switch (gameType) {
    case 'builder':
      return <BuilderGame config={gameConfig} onComplete={onComplete} />;
    case 'letter_assembly':
      return <LetterAssemblyGame config={gameConfig} onComplete={onComplete} />;
    case 'matching':
      return <MatchingGame config={gameConfig} onComplete={onComplete} />;
    default:
      return <div>Game type not found</div>;
  }
}
