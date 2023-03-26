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
import { v4 as uuidv4 } from 'uuid';



interface FetchTasksResponse {
  data: Task[];
}

interface FetchTasksError {
  message: string;
}

interface Task {
    id: string; // добавил поле id для уникального идентификатора.
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
    // const tasks = localStorage.getItem('tasks');
      return {
          tasks: []
        }
    },


  mounted() {
    this.fetchTasks(); // вызываем метод fetchTasks при монтировании компонента
  },

  methods: {
      addTask(newTaskText: string, newTaskDescription: string, dueDate: Date) { // EDITED
        const newTask: Task = {
          id: uuidv4(), // генерирую уникальный идентификатор для новой задачи
          text: newTaskText.trim(),
          description: newTaskDescription.trim(),
          completed: false,
          deadline: dueDate,
        };

        axios.post('/api/addTasks', newTask)
          .then((response) => {
            // добавляем добавленную задачу в список задач на странице и сортируем список по дате.
            const addedTask: Task = response.data;
            this.tasks.push(addedTask);
            this.tasks.sort((a, b) => (new Date(a.deadline) as any) - (new Date(b.deadline) as any));
          })
          .catch((error) => {
            console.error(error);
          })
      },

      // отгружаю из БД имеющийся список задач
      fetchTasks() {
      console.log('Хотя бы начало работать');
        axios.get<FetchTasksResponse>('/api/getTasks') // ответ с сервера - массив объектов типа Task
          .then(response => {
            // ... ТОЖЕ НУЖНО ОТСОРТИРОВАТЬ ПО ДАТЕ? //
            this.tasks = response.data.data; // обновляем список задач в компоненте
            this.tasks.sort((a, b) => (new Date(a.deadline) as any) - (new Date(b.deadline) as any));
          })
          .catch((error: FetchTasksError) => {
            console.error(error.message);
          });
      },

      deleteTask(index: number, taskId: string): void {
        axios.delete(`/api/deleteTask/${taskId}`)
          .then(response => {
            console.log('Задача успешно удалена');
            const indexCheck = this.tasks.findIndex(task => task.id === taskId);
            if (indexCheck !== -1) {
              this.tasks.splice(indexCheck, 1);
            }
          })
          .catch(error => {
            console.error('Произошла ошибка удаления задачи', error);
          })
      },

      toggleCompleted(index: number, taskId: string): void{
        const task = this.tasks[index];
        task.completed = !task.completed;
        axios.put(`/api/toggle/${task.id}`, { completed: task.completed })
          .then(response => {
            console.log('Task updated successfully!');
          })
          .catch(error => {
            console.log('Произошла ошибка обновления задач на сервере:', error);
            // отменяю изменение, если завершилось неудачей
            task.completed = !task.completed;
          });
      },

      editTaskDescription(index: number, taskId: string): void {
        const newDescription = prompt('Enter new description', this.tasks[index].description);
        console.log(newDescription);
        if (newDescription !== null && newDescription !== undefined) {
          axios.put(`/api/editTasks/${taskId}`, { description: newDescription }, { headers: { 'Content-Type': 'application/json' } })
            .then(response => {
              // Обновляю локальный список задач
              this.tasks.splice(index, 1, response.data);
            })
            .catch(error => {
              console.error(error);
            });
        }
      }
  },
})
</script>

<style>

</style>