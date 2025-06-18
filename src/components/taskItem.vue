<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";
import type { Task } from "../api/tasksApi";

const props = defineProps<{ task: Task }>();
const emit = defineEmits<{
  (e: "toggle", id: number): void;
  (e: "delete", id: number): void;
}>();
</script>

<template>
  <li>
    <input
      type="checkbox"
      :checked="task.completed"
      @change="() => emit('toggle', task.id)"
    />
    <span :style="{ textDecoration: task.completed ? 'line-through' : 'none' }">
      {{ task.title }}
    </span>
    <button @click="() => emit('delete', task.id)">Удалить</button>
  </li>
</template>
