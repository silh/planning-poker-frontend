import Vote from '@/interfaces/Vote';
import Player from '@/interfaces/Player';
import GameState from '@/interfaces/GameState';

interface Game {
  'id': string;
  'creator': Player;
  'state': GameState;
  'participants': {
    [id: string]: Player;
  };
  'votes': {
    [playerId: string]: Vote;
  };
}

export default Game;
