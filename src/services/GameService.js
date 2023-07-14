import http from "../http-commons";

export class GameService {
  static async get(gameId) {
    return (await http.get(`/games/${gameId}`)).data;
  }

  static async create(createGameRequest) {
    return (await http.post("/games", createGameRequest)).data;
  }
}
