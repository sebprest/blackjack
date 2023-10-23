import { createSlice } from "@reduxjs/toolkit";

import { GameState } from "@/app/api/types";
import { DEFAULT_GAME_STATE } from "@/app/api/consts";
import { fetchGameStateAsync } from "./thunks";

const initialState: GameStateSliceState = {
  value: DEFAULT_GAME_STATE,
  status: "idle",
};

export const gameStateSlice = createSlice({
  name: "gameState",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGameStateAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGameStateAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.value = action.payload;
      })
      .addCase(fetchGameStateAsync.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export interface GameStateSliceState {
  value: GameState;
  status: "idle" | "loading" | "failed";
}
