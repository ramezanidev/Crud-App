<template>
  <AppForm label="Edit User" :userId="userId" @submit="submit" />
</template>


<script lang="ts">
import { defineComponent } from "vue";
import AppForm from "../components/AppForm.vue";
import { useRoute } from "vue-router";

export default defineComponent({
  components: {
    AppForm,
  },
  setup() {
    const route = useRoute();

    const userId = route.params.id as string;
    const submit = (e: any) => console.log(e);
    return {
      userId,
      submit,
    };
  },
});
</script>