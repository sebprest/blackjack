import type { ReduxState } from "@/app/lib/redux";

export const selectGameState = (state: ReduxState) => state.gameState.value;
