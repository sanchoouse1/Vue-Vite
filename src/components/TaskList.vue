<template>
<div>
    <ul class="list-group">
        <task-item v-for="(task, index) in tasks" :task="task" :index="index" @delete="deleteTask" @toggle="toggleCompleted" @edit="editTaskDescription"/>
    </ul>
</div>
</template>

<script>
import TaskItem from "./TaskItem.vue"
export default {
    components: {TaskItem},
    // принимаем пропсы (как аргумент) из корневого элемента.
    props: {
        tasks: {
            type: Array,
            required: true
        }
    },
    methods: {
        deleteTask(index) {
            this.$emit("delete", index);
        },
        toggleCompleted(index) {
            this.$emit("toggle", index);
        },
        editTaskDescription(index) {
            this.$emit("edit", index);
        }
    }
}
</script>

<style scoped>

</style>