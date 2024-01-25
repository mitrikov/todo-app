<script setup lang="ts">
import { ref } from 'vue';
import TodoModal from '@/components/TodoModal.vue';
import ModalTransitionFade from "@/components/ui/ModalTransitionFade.vue"
const modal = ref<InstanceType<typeof TodoModal> | null>(null);


const openTodoCreateModal = () => {
  if(!modal.value) return;
  modal.value?.open();
}

</script>

<template>
  <div class="todo-bottom-panel">
    <button class="button" @click="openTodoCreateModal">
        Добавить задачу
    </button>
    
    <Teleport to="#modals">
      <ModalTransitionFade>
        <TodoModal ref="modal" />
      </ModalTransitionFade>
    </Teleport>
  </div>
</template>

<style lang="scss" scoped>
.todo-bottom-panel {
  display: flex;
  justify-content: center;
}
</style>