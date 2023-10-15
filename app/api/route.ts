import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Game from "./Game";

const game = new Game();

export async function POST(request: NextRequest) {
  const { action } = await request.json();

  try {
    switch (action) {
      case "start":
        game.startNewGame();
        break;
      case "hit":
        game.playerHit();
        break;
      case "stand":
        game.playerStand();
        break;
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
  }

  return NextResponse.json(game.gameState, { status: 200 });
}
