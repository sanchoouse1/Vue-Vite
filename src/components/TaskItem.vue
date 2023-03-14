<template>
<li class="list-group-item">
    <div class="form-check">
        <input @click="toggleCompleted" type="checkbox" v-model="task.completed" class="form-check-input"/>
        <label class="form-check-label" :class="{ 'text-decoration-line-through': task.completed }">{{ task.text }}</label>
        <span class="badge bg-info ms-3" v-if="task.description">{{ task.description }}</span>     <!-- ДОБАВЛЕНО -->
        <span class="badge bg-dark ms-3" v-if="task.deadline">{{ task.deadline }}</span>
        <button @click="deleteTask" type="button" class="btn btn-danger ms-2 float-end">Delete</button>
        <button @click="editTaskDescription" type="button" class="btn btn-info me-2 float-end">Edit</button>

    </div>
</li>
</template>

<script>
export default {
    props: {
        task: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            required: true
        }
    },
    methods: {
        deleteTask() {
            // генерирую событие и передаю index
            this.$emit('delete', this.index);
        },
        toggleCompleted() {
            // генерирую событие и передаю index
            this.$emit('toggle', this.index);
        },
        editTaskDescription() {
            this.$emit('edit', this.index);
        }
    }
}
</script>

<style scoped>

</style>