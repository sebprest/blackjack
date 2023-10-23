import {
  CARD_TYPES,
  DEFAULT_GAME_STATE,
  GAME_STATUS,
  PLAYER_TYPES,
} from "../../lib/consts";
import { GameNotInProgressError } from "./errors";
import { GameState, Card } from "./types";

class Game {
  gameState: GameState;

  constructor() {
    this.gameState = { ...DEFAULT_GAME_STATE };
  }

  startNewGame() {
    this.gameState = { ...DEFAULT_GAME_STATE };
    const playerHand = [drawCard(), drawCard()];
    const dealerHand = [drawCard(), drawCard()];
    this.gameState.playerHand = {
      cards: playerHand,
      score: this.calculateScore(playerHand),
    };
    this.gameState.dealerHand = {
      cards: dealerHand,
      score: this.calculateScore(playerHand),
    };
    this.gameState.gameStatus = GAME_STATUS.inProgress;
  }

  playerHit() {
    if (this.gameState.gameStatus !== GAME_STATUS.inProgress) {
      throw new GameNotInProgressError();
    }

    this.gameState.playerHand.cards.push(drawCard());
    this.gameState.playerHand.score = this.calculateScore(
      this.gameState.playerHand.cards,
    );

    if (this.gameState.playerHand.score > 21) {
      this.gameState.winner = PLAYER_TYPES.dealer;
      this.gameState.gameStatus = GAME_STATUS.ended;
    }
  }

  playerStand() {
    if (this.gameState.gameStatus !== GAME_STATUS.inProgress) {
      throw new GameNotInProgressError();
    }

    while (this.gameState.dealerHand.score < 17) {
      this.gameState.dealerHand.cards.push(drawCard());
      this.gameState.dealerHand.score = this.calculateScore(
        this.gameState.dealerHand.cards,
      );
    }

    if (
      this.gameState.dealerHand.score > 21 ||
      this.gameState.playerHand.score > this.gameState.dealerHand.score
    ) {
      this.gameState.winner = "player";
    } else if (
      this.gameState.playerHand.score === this.gameState.dealerHand.score
    ) {
      this.gameState.winner = "draw";
    } else {
      this.gameState.winner = "dealer";
    }

    this.gameState.gameStatus = GAME_STATUS.ended;
  }

  calculateScore(hand: Card[]) {
    let score = 0;
    let numAces = 0;

    for (const card of hand) {
      if (card === "A") {
        score += 11;
        numAces++;
      } else if (["K", "Q", "J"].includes(card)) {
        score += 10;
      } else {
        score += parseInt(card, 10);
      }
    }

    while (score > 21 && numAces > 0) {
      score -= 10;
      numAces--;
    }

    return score;
  }
}

function drawCard() {
  const randomCard = CARD_TYPES[Math.floor(Math.random() * CARD_TYPES.length)];
  return randomCard;
}

export default Game;
