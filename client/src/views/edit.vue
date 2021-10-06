<template>
    <div class="container">
      <div class="mt-4 d-flex justify-content-between">
        <h2>Edit User</h2>
        <router-link to="/">
          <button type="button" class="btn btn-success">Home</button>
        </router-link>
      </div>
      <hr />
      <form class="row g-3">
        <div class="col-md-6">
          <label for="UserName" class="form-label">UserName:</label>
          <input v-model="user.username" type="UserName" class="form-control" id="UserName" />
        </div>
        <div class="col-md-6">
          <label for="Name" class="form-label">Name:</label>
          <input v-model="user.name" type="Name" class="form-control" id="Name" />
        </div>
        <div class="col-12">
          <label for="Email" class="form-label">Email:</label>
          <input v-model="user.email" type="Email" class="form-control" id="Email" />
        </div>
        <div class="col-12">
          <label for="Phone" class="form-label">Phone:</label>
          <input
            type="text"
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
    </div>
</template>


<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useRoute } from "vue-router";
import useAxios from "../composables/axios";

export default defineComponent({
  async setup() {
    const axios = useAxios();
    const route = useRoute();
    const user = reactive({
      id: "",
      name: "",
      username: "",
      email: "",
      phone: "",
    });
    user.id = route.params.id as string;
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${user.id}`
    );
    const { name, username, email, phone } = data;

    user.name = name;
    user.username = username;
    user.email = email;
    user.phone = phone;

    return {
      user,
    };
  },
});
</script>