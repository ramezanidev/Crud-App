<template>
  <div class="container">
    <div class="mt-4 d-flex justify-content-between">
      <h2>List of users</h2>
      <router-link to="/new">
        <button type="button" class="btn btn-success">Add User</button>
      </router-link>
    </div>
    <hr />
    <div class="table-responsive">
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">UserName</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>

        <tbody v-if="users.length">
          <tr v-for="user in users" :key="user.id">
            <th scope="row">{{ user.id }}</th>
            <td>{{ user.username }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.phone }}</td>
            <td>
              <router-link :to="`/edit/${user.id}`">
                <button type="button" class="btn btn-warning btn-sm mx-1">Edit</button>
              </router-link>
              <button type="button" class="btn btn-danger btn-sm mx-1">Del</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Loading  -->
    <div v-if="!users.length" class="d-flex justify-content-center">
      <div class="spinner-border my-5 text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div>
      <h6>
        Total Users:
        <strong>({{ users.length }})</strong>
      </h6>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import useAxios from "../composables/axios";

export default defineComponent({
  setup() {
    const store = useStore();
    const axios = useAxios();

    const users = ref<any>([]);

    const count = computed(() => store.state.count);
    (async () => {
      const todo = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      users.value = todo.data;
    })();

    return {
      count,
      users,
    };
  },
});
</script>