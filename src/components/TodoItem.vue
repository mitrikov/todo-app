<script setup lang="ts">
import { TodoStatuses, type ITodoItem } from '@/interfaces'
import { ref, type PropType, watch, onMounted, onUpdated } from 'vue'
import Checkbox from './ui/Checkbox.vue'
import { useTodosStore } from '@/stores'

const todoStore = useTodosStore()

const props = defineProps({
  item: {
    type: Object as PropType<ITodoItem>,
    required: true
  }
})

const selectCheckbox = ref<boolean>(false)

onUpdated(() => {
  selectCheckbox.value = todoStore.bulkUuids.includes(props.item.uuid)
})
// const status = ref<TodoStatuses>(TodoStatuses.pending)

const emit = defineEmits(['delete', 'edit', 'changeStatus', 'select', 'deselect'])

const onCheck = (e: Event) => {
  emit('changeStatus')
}

watch(
  () => selectCheckbox.value,
  (nVal) => {
    nVal ? emit('select') : emit('deselect')
  }
)
</script>

<template>
  <div class="todo-item">
    <div class="todo-item__common">
      <div class="checkbox">
        <input
          type="checkbox"
          @change="onCheck"
          :checked="item.status === TodoStatuses.completed"
        />
        <!-- <Checkbox /> -->
      </div>

      <div
        class="todo-item__title"
        :class="item.status === TodoStatuses.completed ? 'todo-item__title--completed' : ''"
      >
        {{ item?.title }}
      </div>
    </div>

    <div class="todo-item__buttons" v-if="!todoStore.bulkMode">
      <button>
        <IconEdit
          class="todo-item__icon todo-icon--edit"
          @click="
            () => {
              emit('edit', item.uuid)
            }
          "
        />
      </button>

      <button>
        <IconDelete
          class="todo-item__icon todo-icon--delete"
          @click="
            () => {
              emit('delete', item.uuid)
            }
          "
        />
      </button>
    </div>
    <div class="todo-item__buttons" v-else>
      <input type="checkbox" v-model="selectCheckbox" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: var(--shadow-card);
  background-color: var(--color-background);
  padding: 1rem 1.5rem;
  border-radius: var(--border-radius-sm);
}

.todo-item__common {
  display: flex;
  align-items: center;
  gap: 0.7rem;
}

.todo-item__title {
  &--completed {
    text-decoration: line-through;
  }
}

.todo-item__buttons {
  display: flex;
  gap: 0.7rem;

  button {
    background-color: initial;
    border: none;
    padding: 0;
    margin: 0;
  }
}

.todo-item__icon {
  width: 16px;
  height: 16px;
}
</style>
