<script lang="ts" setup>
import { ref } from "vue";
const title = ref("");
const emit = defineEmits(["add"]);

function handleSubmit() {
  if (title.value.trim()) {
    emit("add", title.value);
    title.value = "";
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="title" placeholder="Новая задача" />
    <button type="submit">Добавить</button>
  </form>
</template>
