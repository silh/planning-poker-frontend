import http from "../http-commons";

export class UserService {
  static async create(playerName) {
    return (await http.post("/users", { name: playerName })).data;
  }

  static async get(id) {
    return (await http.post(`/users/${id}`)).data;
  }
}
