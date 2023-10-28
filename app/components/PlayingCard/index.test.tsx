import { render } from "@testing-library/react";
import PlayingCard from "./";

describe("PlayingCard", () => {
  const card = "10";

  describe("when face up", () => {
    it("should render the card value twice", () => {
      const { queryAllByText } = render(<PlayingCard card={card} />);
      expect(queryAllByText("10")).toHaveLength(2);
      expect(queryAllByText("10")).toHaveLength(2);
    });

    it("should render a white background", () => {
      const { container } = render(<PlayingCard card={card} />);
      expect(container.firstChild).toHaveClass("bg-white");
    });
  });

  describe("when face down", () => {
    it("should render a check pattern background", () => {
      const { container } = render(<PlayingCard card={card} isFaceDown />);
      expect(container.firstChild).toHaveClass(
        "bg-[linear-gradient(45deg,#0ff_25%,transparent_25%),linear-gradient(-45deg,#00f_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#0f0_25%),linear-gradient(-45deg,transparent_75%,#f00_25%)]",
      );
    });
  });
});
