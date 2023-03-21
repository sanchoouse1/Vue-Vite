<template>
<div>
    <ul class="list-group">
        <task-item v-for="(task, index) in tasks" :task="task" :index="index" @delete="deleteTask" @toggle="toggleCompleted" @edit="editTaskDescription"/>
    </ul>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TaskItem from "./TaskItem.vue";

interface Task {
  text?: string;
  description?: string;
  completed?: boolean;
  deadline: Date;
}

export default defineComponent({
    components: {TaskItem},
    // принимаем пропсы (как аргумент) из корневого элемента.
    props: {
        tasks: {
            type: Array as () => Task[], // массив объектов типа Task, типы ключей которого заданы в интерфейсе выше
            required: true
        }
    },
    methods: {
        deleteTask(index: number): void {
            this.$emit("delete", index);
        },
        toggleCompleted(index: number): void {
            this.$emit("toggle", index);
        },
        editTaskDescription(index: number): void {
            this.$emit("edit", index);
        }
    }
})
</script>

<style scoped>

</style>