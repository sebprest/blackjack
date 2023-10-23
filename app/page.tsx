"use client";
import { PLAYER_TYPES } from "../lib/consts";
import EndGameScreen from "./components/EndGameScreen";
import Hand from "./components/Hand";
import NewGame from "./components/NewGame";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Hand player={PLAYER_TYPES.dealer} />
      <NewGame />
      <EndGameScreen />
      <Hand player={PLAYER_TYPES.player} />
    </main>
  );
}
