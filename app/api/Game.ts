import {
  CARD_TYPES,
  DEFAULT_GAME_STATE,
  GAME_STATUS,
  PLAYER_TYPES,
} from "./consts";
import { GameNotInProgressError } from "./errors";
import { GameState, Hand } from "./types";

class Game {
  gameState: GameState;

  constructor() {
    this.gameState = DEFAULT_GAME_STATE;
  }

  startNewGame() {
    let { playerHand, dealerHand, gameStatus } = this.gameState;

    playerHand = [drawCard(), drawCard()];
    dealerHand = [drawCard(), drawCard()];
    gameStatus = GAME_STATUS.inProgress;
  }

  playerHit() {
    let { playerHand, gameStatus, winner } = this.gameState;

    if (gameStatus !== GAME_STATUS.inProgress) {
      throw new GameNotInProgressError();
    }

    playerHand.push(drawCard());

    const playerScore = this.calculateScore(playerHand);

    if (playerScore > 21) {
      winner = PLAYER_TYPES.dealer;
      gameStatus = GAME_STATUS.ended;
    }
  }

  playerStand() {
    let { playerHand, dealerHand, gameStatus, winner } = this.gameState;

    if (gameStatus !== GAME_STATUS.inProgress) {
      throw new GameNotInProgressError();
    }

    while (this.calculateScore(dealerHand) < 17) {
      dealerHand.push(drawCard());
    }

    const playerScore = this.calculateScore(playerHand);
    const dealerScore = this.calculateScore(dealerHand);

    if (dealerScore > 21 || playerScore > dealerScore) {
      winner = "player";
    } else if (playerScore === dealerScore) {
      winner = "draw";
    } else {
      winner = "dealer";
    }

    gameStatus = GAME_STATUS.ended;
  }

  calculateScore(hand: Hand) {
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
