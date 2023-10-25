import Game from "./Game";

describe("Game", () => {
  let game: Game;

  beforeEach(() => {
    game = new Game();
    game.startNewGame();
  });

  describe("playerHit", () => {
    it("should throw an error if the game is not in progress", () => {
      game.gameState.gameStatus = "ended";

      expect(() => game.playerHit()).toThrowError(
        "Game not in progress. Please start a new game.",
      );
    });

    it("should add a card to the player hand and update the score", () => {
      const initialScore = game.gameState.playerHand.score;

      game.playerHit();

      expect(game.gameState.playerHand.cards.length).toBe(3);
      expect(game.gameState.playerHand.score).toBeGreaterThan(initialScore);
    });

    it("should end the game if the player score is greater than 21", () => {
      game.gameState.playerHand.cards = ["10", "10", "10"];

      game.playerHit();

      expect(game.gameState.gameStatus).toBe("ended");
      expect(game.gameState.winner).toBe("dealer");
    });
  });

  describe("playerStand", () => {
    it("should throw an error if the game is not in progress", () => {
      game.gameState.gameStatus = "ended";

      expect(() => game.playerStand()).toThrowError(
        "Game not in progress. Please start a new game.",
      );
    });

    it("should add cards to the dealer hand until the score is 17 or greater", () => {
      game.gameState.dealerHand.cards = ["10", "6"];
      game.gameState.dealerHand.score = 16;

      game.playerStand();

      expect(game.gameState.dealerHand.cards.length).toBeGreaterThan(2);
      expect(game.gameState.dealerHand.score).toBeGreaterThanOrEqual(17);
    });

    it("should end the game", () => {
      game.playerStand();

      expect(game.gameState.gameStatus).toBe("ended");
    });

    it("should set the winner", () => {
      game.playerStand();

      expect(["player", "dealer", "draw"]).toContain(game.gameState.winner);
    });
  });
});
