import { createAppAsyncThunk } from "@/app/lib/redux/createAppAsyncThunk";
import { fetchGameState } from "./fetchGameState";

export const fetchGameStateAsync = createAppAsyncThunk(
  "gameState/fetchGameState",
  async (action: "start" | "hit" | "stand") => {
    const response = await fetchGameState(action);

    return response;
  },
);
