// src/store/index.ts
import { createStore } from 'vuex';
import { tasksApi } from '../api/tasksApi';
import type { Task } from '../api/tasksApi'; 

type Filter = 'all' | 'active' | 'completed';

export interface State {
  tasks: Task[];
  filter: Filter;
}

export const store = createStore<State>({
  state: {
    tasks: [],
    filter: 'all',
  },
  getters: {
    filteredTasks(state) {
      if (state.filter === 'active') return state.tasks.filter(t => !t.completed);
      if (state.filter === 'completed') return state.tasks.filter(t => t.completed);
      return state.tasks;
    },
  },
  mutations: {
    setTasks(state, tasks: Task[]) {
      state.tasks = tasks;
    },
    addTask(state, task: Task) {
      state.tasks.push(task);
    },
    deleteTask(state, id: number) {
      state.tasks = state.tasks.filter(t => t.id !== id);
    },
    toggleTask(state, updatedTask: Task) {
      const index = state.tasks.findIndex(t => t.id === updatedTask.id);
      if (index !== -1) state.tasks[index] = updatedTask;
    },
    setFilter(state, filter: Filter) {
      state.filter = filter;
    },
  },
  actions: {
    async fetchTasks({ commit }) {
      const tasks = await tasksApi.getTasks();
      commit('setTasks', tasks);
    },
    async addTask({ commit }, title: string) {
      const task = await tasksApi.addTask(title);
      commit('addTask', task);
    },
    async deleteTask({ commit }, id: number) {
      await tasksApi.deleteTask(id);
      commit('deleteTask', id);
    },
    async toggleTask({ commit }, id: number) {
      const updatedTask = await tasksApi.toggleTask(id);
      commit('toggleTask', updatedTask);
    },
    setFilter({ commit }, filter: Filter) {
      commit('setFilter', filter);
    },
  },
});