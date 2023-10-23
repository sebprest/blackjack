import { GameState } from "./types";

export const CARD_TYPES = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
] as const;
export const PLAYER_TYPES = {
  player: "player",
  dealer: "dealer",
} as const;
export const GAME_STATUS = {
  notStarted: "notStarted",
  inProgress: "inProgress",
  ended: "ended",
} as const;
export const DEFAULT_GAME_STATE: GameState = {
  playerHand: { cards: [], score: 0 },
  dealerHand: { cards: [], score: 0 },
  winner: null,
  gameStatus: GAME_STATUS.notStarted,
};
