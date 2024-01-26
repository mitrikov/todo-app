<script setup lang="ts">
import type { ITodoFormData, ITodoItem } from '@/interfaces'
import { ref, type PropType } from 'vue'

const props = defineProps({
  todo: {
    type: Object as PropType<ITodoItem>,
    required: false
  }
})

const formData = ref<ITodoFormData>({
    title: null,
    description: null
})

if(props.todo) {
    formData.value.title = props.todo.title
    formData.value.description = props.todo.description
}

defineExpose({
    formData
})
</script>

<template>
  <div class="todo-modal-form">
    <div class="input-wrapper">
      <label for="title">Задача:</label>
      <input 
        type="text" 
        name="title" 
        class="todo-modal-form__input" 
        v-model="formData.title"
      />
    </div>

    <div class="input-wrapper">
      <label for="title">Описание:</label>
      <textarea 
        name="description" 
        class="todo-modal-form__input todo-modal-form__description"
        v-model="formData.description"
        ></textarea>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.todo-modal-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  min-width: 350px;
}

.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.todo-modal-form__description {
  min-height: 100px;
}

.todo-modal-form__input {
  font-size: 18px;
  padding: 0.7rem 1rem;
  border-radius: 8px;
  border: 1px solid #cecece;
}
</style>
