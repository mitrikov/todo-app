<script setup lang="ts">
import {TodoStatuses} from "@/interfaces"
import { ref } from "vue";

const statusFilter = ref<string | TodoStatuses>("all")
</script>

<template>
  <div class="todo-top-panel">
    <select name="status" v-model="statusFilter">
        <option value="all" selected>Все</option>
        <option :value="TodoStatuses.pending">Невыполненные</option>
        <option :value="TodoStatuses.completed">Завершённые</option>
    </select>

    <IconDelete />
  </div>
</template>

<style lang="scss" scoped>
.todo-top-panel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
</style>