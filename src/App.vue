<script lang="ts" setup>
import { onMounted, computed, ref } from "vue";
import { useStore } from "vuex";
import TaskInput from "./components/TaskInput.vue";
import TaskItem from "./components/TaskItem.vue";

const store = useStore();
const newTaskTitle = ref("");

const filteredTasks = computed(() => store.getters.filteredTasks);

const addTask = (title: string) => {
  if (!title.trim()) return;
  store.dispatch("addTask", title);
  newTaskTitle.value = "";
};

const deleteTask = (id: number) => store.dispatch("deleteTask", id);
const toggleTask = (id: number) => store.dispatch("toggleTask", id);
const setFilter = (filter: "all" | "active" | "completed") =>
  store.dispatch("setFilter", filter);

onMounted(() => {
  store.dispatch("fetchTasks");
});
</script>

<template>
  <div
    class="app-container"
    style="
      max-width: 600px;
      margin: auto;
      padding: 1rem;
      font-family: Arial, sans-serif;
    "
  >
    <h1>Список задач</h1>

    <div style="margin-bottom: 1rem">
      <input
        v-model="newTaskTitle"
        @keyup.enter="addTask(newTaskTitle)"
        placeholder="Новая задача"
      />
      <button @click="addTask(newTaskTitle)">Добавить</button>
    </div>

    <div style="margin-bottom: 1rem">
      <button
        @click="setFilter('all')"
        :style="{
          fontWeight: store.state.filter === 'all' ? 'bold' : 'normal',
        }"
      >
        Все
      </button>
      <button
        @click="setFilter('active')"
        :style="{
          fontWeight: store.state.filter === 'active' ? 'bold' : 'normal',
          marginLeft: '0.5rem',
        }"
      >
        Активные
      </button>
      <button
        @click="setFilter('completed')"
        :style="{
          fontWeight: store.state.filter === 'completed' ? 'bold' : 'normal',
          marginLeft: '0.5rem',
        }"
      >
        Выполненные
      </button>
    </div>

    <ul style="list-style: none; padding-left: 0">
      <li
        v-for="task in filteredTasks"
        :key="task.id"
        style="display: flex; align-items: center; margin-bottom: 0.5rem"
      >
        <input
          type="checkbox"
          :checked="task.completed"
          @change="toggleTask(task.id)"
          style="margin-right: 0.5rem"
        />
        <span
          :style="{
            textDecoration: task.completed ? 'line-through' : 'none',
            flexGrow: 1,
          }"
        >
          {{ task.title }}
        </span>
        <button @click="deleteTask(task.id)" style="margin-left: 0.5rem">
          Удалить
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
