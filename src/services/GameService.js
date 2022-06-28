import http from "../http-commons";

export class GameService {
  static async get(gameId) {
    return (await http.get(`/games/${gameId}`)).data;
  }

  static async create(createGameRequest) {
    return (await http.post("/games", createGameRequest)).data;
  }

  static async join(gameId, joinRequest) {
    await http.put(`/games/${gameId}/join`, joinRequest);
  }

  static async vote(gameId, voteRequest) {
    await http.post(`/games/${gameId}/vote`, voteRequest);
  }
}
