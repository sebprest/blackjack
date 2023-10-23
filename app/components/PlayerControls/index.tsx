"use client";

import { fetchGameStateAsync, useDispatch } from "@/app/lib/redux";

function PlayerControls() {
  const dispatch = useDispatch();

  function handleHit() {
    dispatch(fetchGameStateAsync("hit"));
  }

  function handleStand() {
    dispatch(fetchGameStateAsync("stand"));
  }

  return (
    <div className="text-center">
      <button onClick={handleHit}>Hit</button>
      <button onClick={handleStand}>Stand</button>
    </div>
  );
}

export default PlayerControls;
