
export enum GameStatus {
  START = 'START',
  LOADING = 'LOADING',
  PLAYING = 'PLAYING',
  ERROR = 'ERROR',
}

export interface Scene {
  description: string;
  choices: string[];
  imageUrl: string;
}

export interface GameState {
  status: GameStatus;
  history: Scene[];
  currentScene: Scene | null;
  error: string | null;
}
