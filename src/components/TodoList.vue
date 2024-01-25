<script setup lang="ts">
import { useTodosStore } from "@/stores"
import TodoItem from "./TodoItem.vue";
import type { ITodoItem } from "@/interfaces";
import { onMounted, ref } from "vue";
import TodoModal from '@/components/TodoModal.vue';
import ModalTransitionFade from "@/components/ui/ModalTransitionFade.vue"

const modal = ref<InstanceType<typeof TodoModal> | null>(null);

const todosStore = useTodosStore()
const currentItem = ref<ITodoItem | null>(null)

onMounted(() => {
  todosStore.readFromLocalStorage()
})

const onEdit = (item : ITodoItem) => {
  currentItem.value = item
  if(modal.value) {
    modal.value.open()
  }
}

const onStatusChange = (uuid : string) => {
  todosStore.toggleStatus(uuid)
}

const onRemove = (uuid : string) => {
  todosStore.remove(uuid)
}
</script>

<template>
  <div class="todo-list">
    <div class="todo-list__inner" v-if="todosStore.todos.length !== 0">
      <TodoItem 
        v-for="item in todosStore.todos" 
        :key="item.uuid" 
        :item="item"
        @delete="onRemove(item.uuid)"
        @edit="onEdit(item)"
        @change-status="onStatusChange(item.uuid)"
        />
    </div>

    <div class="todo-list__placeholder" v-else>
      <i>У вас нет активных задач. Чтобы добавить, нажмите «Добавить задачу»</i>
    </div>

    <Teleport to="#modals">
      <ModalTransitionFade>
        <TodoModal ref="modal" :todo="currentItem ? currentItem : undefined"/>
      </ModalTransitionFade>
    </Teleport>
  </div>
</template>

<style lang="scss" scoped>
.todo-list {
  min-height: 200px;
  display: flex;
  flex-direction: column;
}

.todo-list__inner {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 2rem 0;
}

.todo-list__placeholder {
  display: flex;
  height: 100%;
  width: 100%;
  flex: 1;
  align-items: center;
  justify-content: center;
  text-align: center;

  i {
    max-width: 20em;
  }
}
</style>