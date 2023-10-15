import { CARD_TYPES, GAME_STATUS, PLAYER_TYPES } from "./consts";

export type Card = (typeof CARD_TYPES)[number];
export type Hand = Card[];
export type PlayerType = (typeof PLAYER_TYPES)[keyof typeof PLAYER_TYPES];
export type GameStatus = (typeof GAME_STATUS)[keyof typeof GAME_STATUS];

export interface GameState {
  playerHand: Hand;
  dealerHand: Hand;
  winner: PlayerType | "draw" | null;
  gameStatus: GameStatus;
}
