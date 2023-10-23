import { Card } from "@/app/api/types";

interface PlayingCardProps {
  card: Card;
  isFaceDown?: boolean;
}

export function PlayingCard({ card, isFaceDown }: PlayingCardProps) {
  const checkPattern =
    "bg-[linear-gradient(45deg,#0ff_25%,transparent_25%),linear-gradient(-45deg,#00f_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#0f0_25%),linear-gradient(-45deg,transparent_75%,#f00_25%)]";

  return (
    <div
      className={`bg-white text-black rounded-lg shadow-lg w-24 h-36 ${
        isFaceDown && checkPattern
      }`}
    >
      <div className="p-4 h-full flex flex-wrap justify-between">
        {!isFaceDown && (
          <>
            <div className="text-2xl font-bold">{card}</div>
            <div className="text-2xl font-bold mt-auto ml-auto">{card}</div>
          </>
        )}
      </div>
    </div>
  );
}

export default PlayingCard;
