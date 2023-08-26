import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    user: undefined,
  }),
  getters: {
    currentUser: (state) => {
      if (!state.user && localStorage.getItem("user")) {
        try {
          state.user = JSON.parse(localStorage.getItem("user"));
        } catch (e) {
          localStorage.removeItem("user");
        }
      }
      return state.user;
    },
  },
  actions: {
    save(user) {
      this.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    logout() {
      this.user = undefined;
      localStorage.removeItem("user");
    },
  },
});
