"use client";

import { useDispatch } from "@/app/lib/redux";
import { fetchGameStateAsync } from "@/app/lib/redux";

function NewGame() {
  const dispatch = useDispatch();

  function handleStartNewGame() {
    dispatch(fetchGameStateAsync("start"));
  }

  return (
    <div className="text-center">
      <button onClick={handleStartNewGame}>New Game</button>
    </div>
  );
}

export default NewGame;
