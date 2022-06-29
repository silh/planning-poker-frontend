import http from "../http-commons";

export class UserService {
  static async signup(playerName) {
    return (await http.post("/signup", { name: playerName.value })).data;
  }
}
