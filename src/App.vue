<template>
  <div class="container">
      <header-manager/>
      <task-form @add="addTask"/>
      <task-list @delete="deleteTask" @toggle="toggleCompleted" @edit="editTaskDescription" :tasks="tasks"/>
  </div>
</template>

<script>
import HeaderManager from "./components/HeaderManager.vue"
import TaskForm from "./components/TaskForm.vue"
import TaskList from "./components/TaskList.vue"

export default {
  components: {
    HeaderManager, TaskForm, TaskList
  },
  data() {
      return {
          tasks: JSON.parse(localStorage.getItem('tasks')) || [],
        }
    },
  methods: {
      addTask(newTaskText, newTaskDescription, dueDate) { // EDITED
          this.tasks.push({
            text: newTaskText.trim(),
            description: newTaskDescription.trim(), // ДОБАВЛЕНО
            completed: false,
            deadline: dueDate,
          });
          this.tasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
          localStorage.setItem('tasks', JSON.stringify(this.tasks));
      },

      deleteTask(index) {
        console.log('Функция удаления срабатывает');
        this.tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
      },

      toggleCompleted(index) {
        const task = this.tasks[index];
        task.completed = !task.completed;
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
      },
      editTaskDescription(index) {
        let newDescription = prompt('Enter new description', this.tasks[index].description);
        if (newDescription !== null) {
          this.tasks[index].description = newDescription;
        }
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
      }
  },
}
</script>

<style>

</style>