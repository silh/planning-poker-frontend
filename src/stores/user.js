import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    user: undefined,
  }),
  getters: {
    currentUser: (state) => {
      if (!state.user && localStorage.user) {
        try {
          if (localStorage.user) {
            state.user = JSON.parse(localStorage.user);
          }
        } catch (e) {
          localStorage.user = undefined;
        }
      }
      return state.user;
    },
  },
  actions: {
    save(user) {
      this.user = user;
      localStorage.user = JSON.stringify(user);
    },
    logout() {
      this.user = undefined;
      localStorage.user = undefined;
    }
  },
});
