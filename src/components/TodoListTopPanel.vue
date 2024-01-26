<script setup lang="ts">
import {TodoStatuses} from "@/interfaces"
import { useTodosStore } from "@/stores";
import { ref, watch } from "vue";

const todoStore = useTodosStore()

const filter = ref<TodoStatuses | "all">("all")

const disableBulkMode = () => {
  todoStore.bulkMode = false
  todoStore.bulkUuids = []
}

const bulkDelete = () => {
  todoStore.deleteSelected()
  todoStore.bulkMode = false
  todoStore.bulkUuids = []
}

watch(filter, (nVal) => {
  todoStore.bulkMode = false
  todoStore.bulkUuids = []
  if(nVal === "all") {
    todoStore.statusFilter = null
  } else {
    todoStore.statusFilter = nVal
  }
})
</script>

<template>
  <div class="todo-top-panel">
    <select name="status" v-model="filter">
        <option value="all" selected>Все</option>
        <option :value="TodoStatuses.pending">Невыполненные</option>
        <option :value="TodoStatuses.completed">Завершённые</option>
    </select>

    <div class="bulk-delete__wrapper">
      
      <button class="button--plain" v-if="!todoStore.bulkMode" @click="todoStore.bulkMode = true">Выделить несколько</button>
      <div v-if="todoStore.bulkMode">{{ todoStore.bulkUuids.length }} элемент(-ов) выбрано</div>
      <button class="button--plain button--delete" v-if="todoStore.bulkMode" @click="bulkDelete">Удалить</button>
      <button class="button--plain" v-if="todoStore.bulkMode" @click="disableBulkMode">Отменить</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.todo-top-panel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.bulk-delete__wrapper {
  font-size: 12px;
  display: flex;
  gap: 0.5rem;
}

.button--delete {
  color: red;
}
</style>