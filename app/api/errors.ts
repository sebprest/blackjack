export class BlackjackError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BlackjackError";
  }
}

export class InvalidActionError extends BlackjackError {
  constructor() {
    super("Invalid action.");
    this.name = "InvalidActionError";
  }
}

export class GameNotInProgressError extends BlackjackError {
  constructor() {
    super("Game not in progress. Please start a new game.");
    this.name = "GameNotInProgressError";
  }
}
