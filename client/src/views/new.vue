<template>
  <AppForm label="Add User" @submit="submit" />
</template>


<script lang="ts">
import { defineComponent } from "vue";
import AppForm from "../components/AppForm.vue";
interface User {
  name: string;
  username: string;
  email: string;
  phone: string;
  id: string;
}

import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
    AppForm,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const submit = async (user: User) => {
      await store.dispatch("addUser", user);
      await router.push("/")
    };
    return {
      submit,
    };
  },
});
</script>