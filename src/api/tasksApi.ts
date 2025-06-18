export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

let tasks: Task[] = [
  { id: 1, title: 'Сделать проект', completed: false },
  { id: 2, title: 'Проверить код', completed: true },
];

let idCounter = 3;

export const tasksApi = {
  getTasks(): Promise<Task[]> {
    return new Promise(resolve => setTimeout(() => resolve([...tasks]), 500));
  },
  addTask(title: string): Promise<Task> {
    return new Promise(resolve => setTimeout(() => {
      const newTask = { id: idCounter++, title, completed: false };
      tasks.push(newTask);
      resolve(newTask);
    }, 500));
  },
  deleteTask(id: number): Promise<void> {
    return new Promise(resolve => setTimeout(() => {
      tasks = tasks.filter(task => task.id !== id);
      resolve();
    }, 500));
  },
  toggleTask(id: number): Promise<Task> {
    return new Promise(resolve => setTimeout(() => {
      const task = tasks.find(t => t.id === id);
      if (task) task.completed = !task.completed;
      resolve({ ...task! });
    }, 500));
  },
};