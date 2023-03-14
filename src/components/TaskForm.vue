<template>
<form @submit.prevent>
    <div class="input-group mb-3">
        <input v-model="newTaskText" placeholder="Enter a new task" class="form-control"/>
        <input v-model="newTaskDescription" placeholder="Enter a description" class="form-control"/> <!-- ДОБАВЛЕНО -->
        <input v-model="dueDate" type="date" class="form-control"/>
        <button @click="addTask" type="submit" class="btn btn-primary">Add Task</button>
    </div>
</form>
</template>

<script>
export default {
    data() {
        return {
            newTaskText: '',
            newTaskDescription: '', // ДОБАВЛЕНО
            dueDate: null,
        }
    },
    methods: {
        addTask() {
            if (this.newTaskText.trim()) {
                // генерируем событие
                this.$emit('add', this.newTaskText, this.newTaskDescription, this.dueDate); // EDITED
                this.newTaskText = '';
                this.newTaskDescription = ''; // ДОБАВЛЕНО
                this.dueDate = null;
            }
        }
    }
}
</script>

<style scoped>

</style>