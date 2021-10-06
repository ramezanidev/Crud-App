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

        <tbody v-if="users.length && !error.status">
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
    <div v-if="!users.length &&!error.status" class="d-flex justify-content-center">
      <div class="spinner-border my-5 text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div class="alert alert-danger text-center mt-3" role="alert" v-if="error.status">{{error.msg}}</div>

    <div v-if="users.length && !error.status">
      <h6>
        Total Users:
        <strong>({{ users.length }})</strong>
      </h6>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from "vue";
import { useStore } from "vuex";
import useAxios from "../composables/axios";

export default defineComponent({
  setup() {
    const store = useStore();
    const axios = useAxios();

    const users = ref<any>([]);
    const error = reactive({
      status: false,
      msg: "",
    });

    const count = computed(() => store.state.count);
    (async () => {
      try {
        const { data } = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        if ((data as []).length) {
          users.value = data;
          error.status = false;
        } else {
          error.status = true;
          error.msg = "Empty";
        }
      } catch (err) {
        error.status = true;
        error.msg = "Server Error";
      }
    })();

    return {
      error,
      users,
    };
  },
});
</script>