"use client";

import { selectGameState, useSelector } from "@/lib/redux";

function EndGameScreen() {
  const gameState = useSelector(selectGameState);

  const winner = gameState?.winner;

  if (!winner) return null;

  return (
    <div>
      <h1>Game Over</h1>
      {winner === "draw" ? <h2>Draw!</h2> : <h2>{winner} wins!</h2>}
    </div>
  );
}

export default EndGameScreen;
