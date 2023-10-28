import { render } from "@testing-library/react";
import { useSelector } from "react-redux";
import Hand from "./";

jest.mock("react-redux");

describe("Hand", () => {
  const gameState = {
    playerHand: { cards: ["1", "2", "3"], score: 6 },
    dealerHand: { cards: ["7", "8"], score: 15 },
    gameStatus: "inProgress",
    winner: null,
  };

  beforeEach(() => {
    useSelector.mockImplementation(() => gameState);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("when game is not started", () => {
    it("should not render the hand", () => {
      useSelector.mockImplementation((selector) =>
        selector({ gameState: { gameStatus: "notStarted" } }),
      );
      const { container } = render(<Hand player="player" />);
      expect(container.firstChild).toBeNull();
    });
  });

  describe("when game is in progress", () => {
    it("should render the hand and player score for the player hand", () => {
      const { getByText } = render(<Hand player="player" />);
      expect(getByText("player")).toBeInTheDocument();
      expect(getByText("6")).toBeInTheDocument();
    });

    it("should render the hand and hide the dealer score for the dealer hand", () => {
      const { getByText, queryByText } = render(<Hand player="dealer" />);
      expect(getByText("dealer")).toBeInTheDocument();
      expect(queryByText("15")).toBeNull();
    });
  });

  describe("when game is ended", () => {
    it("should render the hand and player score for the player hand", () => {
      useSelector.mockImplementation(() => ({
        ...gameState,
        gameStatus: "ended",
        winner: "player",
      }));
      const { getByText, getAllByText } = render(<Hand player="player" />);
      expect(getByText("player")).toBeInTheDocument();
      expect(getByText("6")).toBeInTheDocument();
      expect(getAllByText("1")).toHaveLength(2);
      expect(getAllByText("2")).toHaveLength(2);
      expect(getAllByText("3")).toHaveLength(2);
    });

    it("should render the hand and dealer score for the dealer hand", () => {
      useSelector.mockImplementation(() => ({
        ...gameState,
        gameStatus: "ended",
        winner: "dealer",
      }));
      const { getByText, getAllByText } = render(<Hand player="dealer" />);
      expect(getByText("dealer")).toBeInTheDocument();
      expect(getByText("15")).toBeInTheDocument();
      expect(getAllByText("7")).toHaveLength(2);
      expect(getAllByText("8")).toHaveLength(2);
    });
  });
});
