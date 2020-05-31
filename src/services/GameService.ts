import axios from 'axios';
import Game from '@/interfaces/Game';

export default class GameService {
  public static createGame(name: string): Promise<Game> {
    return axios.post('/api/game', { name })
      .then((resp) => resp.data);
  }

  public static getGame(gameId: string): Promise<Game> {
    return axios.get(`/api/game/${gameId}`)
      .then((resp) => resp.data);
  }
}
