<template>
  <AppForm label="Edit User" :userId="userId" @submit="submit" />
</template>


<script lang="ts">
import { defineComponent } from "vue";
import AppForm from "../components/AppForm.vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

interface User {
  name: string;
  username: string;
  email: string;
  phone: string;
  id: string;
}

export default defineComponent({
  components: {
    AppForm,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const userId = route.params.id as string;
    const submit = async (user: User) => {
      await store.dispatch("editUser", user);
      await router.push("/");
    };

    return {
      userId,
      submit,
    };
  },
});
</script>