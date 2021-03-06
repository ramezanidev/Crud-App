<template>
  <div class="container">
    <div class="mt-4 d-flex justify-content-between">
      <h2>{{ label }}</h2>
      <router-link to="/">
        <button type="button" class="btn btn-success">Home</button>
      </router-link>
    </div>
    <hr />
    <form class="row g-3" v-if="status" @submit.prevent="submit">
      <div class="col-md-6">
        <label for="UserName" class="form-label">UserName:</label>
        <input v-model="user.username" type="UserName" class="form-control" id="UserName" required />
      </div>
      <div class="col-md-6">
        <label for="Name" class="form-label">Name:</label>
        <input v-model="user.name" type="Name" class="form-control" id="Name" required />
      </div>
      <div class="col-12">
        <label for="Email" class="form-label">Email:</label>
        <input v-model="user.email" type="Email" class="form-control" id="Email" required />
      </div>
      <div class="col-12">
        <label for="Phone" class="form-label">Phone:</label>
        <input
          type="text"
          required
          v-model="user.phone"
          class="form-control"
          id="Phone"
          placeholder="+98 - 9910000000"
        />
      </div>
      <div class="col-12">
        <button type="submit" class="btn w-100 btn-primary">Save</button>
      </div>
    </form>

    <!-- Loading  -->
    <div v-else class="d-flex justify-content-center">
      <div class="spinner-border my-5 text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, onBeforeMount, reactive, ref } from "vue";

import { useStore } from "vuex";
interface User {
  name: string;
  username: string;
  email: string;
  phone: string;
  id: string;
}

export default defineComponent({
  props: {
    label: {
      type: String,
      default: "",
    },
    userId: {
      type: String,
      default: "",
    },
  },
  emits: ["submit"],
  setup(props, { emit }) {
    const store = useStore();
    const status = ref<boolean>(false);
    const user = reactive({
      id: "",
      name: "",
      username: "",
      email: "",
      phone: "",
    });

    user.id = props.userId as string;
    onBeforeMount(async () => {
      const setUser = ({ name, username, email, phone }: User) => {
        user.name = name;
        user.username = username;
        user.email = email;
        user.phone = phone;

        status.value = true;
      };

      if (user.id) {
        if (store.getters.isReload) {
          const data = store.getters.getuserWithID(user.id);
          setUser(data);
        } else {
          await store.dispatch("reloadUsers");
          const data = store.getters.getuserWithID(user.id);
          setUser(data);
        }
      } else {
        status.value = true;  
      }
    });

    const submit = () => {
      emit("submit", user);
    };

    return {
      user,
      status,
      submit,
    };
  },
});
</script>