import { createStore } from "vuex";
import useAxios from "../composables/axios";

export interface State {
  users: Array<{
    name: string;
    username: string;
    email: string;
    phone: string;
    id: string;
  }>;
  isReload: boolean;
}

const store = createStore<State>({
  state() {
    return {
      users: [],
      isReload: false,
    };
  },
  getters: {
    getUsers: (state) => state.users,
    getuserWithID: (state) => (id: string) => {
      return state.users.find((user) => user.id == id);
    },
    isReload: (state) => state.isReload,
  },
  mutations: {
    SET_USERS(state, payload) {
      state.users = payload;
      state.isReload = true;
    },
  },
  actions: {
    async reloadUsers({ commit }) {
      const axios = useAxios("http://localhost:8080");
      const { data } = await axios.post(`/users`);
      commit("SET_USERS", data);
    },
    async deleteUser({ commit }, id) {
      const axios = useAxios("http://localhost:8080");
      await axios.delete(`/users/${id}`);
    },
    async addUser(){
      
    }
  },
});

export default store;
