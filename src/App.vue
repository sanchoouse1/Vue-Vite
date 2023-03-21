<template>
  <div class="container">
      <header-manager />
      <task-form @add="addTask"/>
      <task-list @delete="deleteTask" @toggle="toggleCompleted" @edit="editTaskDescription" :tasks="tasks"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HeaderManager from "./components/HeaderManager.vue";
import TaskForm from "./components/TaskForm.vue";
import TaskList from "./components/TaskList.vue";
import axios from 'axios';


interface Task {
    text?: string;
    description?: string;
    completed?: boolean;
    deadline: Date;
}

export default defineComponent({
  components: {
    HeaderManager, TaskForm, TaskList
  },
  data(): { tasks: Task[]} { // указывает, что функция data возвращает объект с полем tasks, значение которого является массивом объектов Task.
    const tasks = localStorage.getItem('tasks');
      return {
          tasks: tasks ? JSON.parse(tasks) : [],
        }
    },
  methods: {
      addTask(newTaskText: string, newTaskDescription: string, dueDate: Date) { // EDITED
        this.tasks.push({
            text: newTaskText.trim(),
            description: newTaskDescription.trim(), // ДОБАВЛЕНО
            completed: false,
            deadline: dueDate,
          });
          this.tasks.sort((a, b) => (new Date(a.deadline) as any) - (new Date(b.deadline) as any));
          localStorage.setItem('tasks', JSON.stringify(this.tasks));
      },

      deleteTask(index: number): void {
        console.log('Функция удаления срабатывает');
        this.tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
      },

      toggleCompleted(index: number): void{
        const task = this.tasks[index];
        task.completed = !task.completed;
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
      },
      editTaskDescription(index: number): void {
        let newDescription = prompt('Enter new description', this.tasks[index].description);
        if (newDescription !== null) {
          this.tasks[index].description = newDescription;
        }
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
      }
  },
})
</script>

<style>

</style>