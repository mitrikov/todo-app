<script setup lang="ts">
import TodoList from "@/components/TodoList.vue"
import TodoListBottomPanel from "@/components/TodoListBottomPanel.vue";
import TodoListTopPanel from "@/components/TodoListTopPanel.vue";
</script>

<template>
  <main>
    <TodoListTopPanel />
    <TodoList />
    <TodoListBottomPanel />
  </main>
</template>
