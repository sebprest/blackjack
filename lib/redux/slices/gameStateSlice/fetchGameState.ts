import { GameState } from "@/app/api/types";

export const fetchGameState = async (
  action: "start" | "hit" | "stand",
): Promise<GameState> => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action }),
  });
  const result = await response.json();

  return result;
};
