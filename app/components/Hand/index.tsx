"use client";

import { PlayerType } from "@/app/api/types";
import PlayingCard from "../PlayingCard";
import { PLAYER_TYPES } from "@/lib/consts";
import PlayerControls from "../PlayerControls";
import { useSelector, selectGameState } from "@/lib/redux";

interface HandProps {
  player: PlayerType;
}

function Hand({ player }: HandProps) {
  const gameState = useSelector(selectGameState);

  if (!gameState) return null;

  const hand = gameState[`${player}Hand`];

  return (
    <div className="flex flex-wrap justify-between flex-col border border-white border-solid rounded-lg p-4">
      <p className="text-center">{player}</p>
      <div className="flex flex-row">
        {hand.cards.map((card, i) => (
          <PlayingCard
            key={`${player} ${card} ${i}`}
            card={card}
            isFaceDown={
              gameState.gameStatus !== "ended" &&
              player === PLAYER_TYPES.dealer &&
              i === 0
            }
          />
        ))}
      </div>
      {(player === PLAYER_TYPES.player || gameState.gameStatus === "ended") && (
        <p className="text-center">{hand.score}</p>
      )}
      {player === PLAYER_TYPES.player && <PlayerControls />}
    </div>
  );
}

export default Hand;
