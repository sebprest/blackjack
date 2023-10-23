import type { ReduxState } from "@/lib/redux";

export const selectGameState = (state: ReduxState) => state.gameState.value;
