<template>
  <AppForm label="Add User"  @submit="submit"/>
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


export default defineComponent({
  components: {
    AppForm,
  },
  setup() {
    const submit = (user:User) => console.log(user);
    return {
      submit
    };
  },
});
</script>