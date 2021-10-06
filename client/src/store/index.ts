import { createStore } from "vuex";
import useAxios from "../composables/axios";
const axios = useAxios("https://crud-app-api.vercel.app/");

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
      const { data } = await axios.post(`/users`);
      commit("SET_USERS", data);
    },
    async deleteUser({ }, id) {
      await axios.delete(`/users/${id}`);
    },
    async addUser({}, user){
      await axios.post(`/add`, user);
    },
    async editUser({}, user){
      await axios.post(`/edit`, user);
    }
  },
});

export default store;
