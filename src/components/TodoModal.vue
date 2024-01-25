<script setup lang="ts">
import { ref, type PropType, onBeforeMount, onMounted, toRef, toRefs, watch } from 'vue'
import TodoModalForm from './TodoModalForm.vue'
import Modal from '@/components/ui/Modal.vue'
import { useTodosStore } from '@/stores'
import type { ITodoItem } from '@/interfaces'

type Actions = 'create' | 'update'

const todosStore = useTodosStore()

const modal = ref<InstanceType<typeof Modal> | null>(null)
const form = ref<InstanceType<typeof TodoModalForm> | null>(null)
const action = ref<Actions>('create')

const props = defineProps({
  todo: Object as PropType<ITodoItem>
})


watch(() => props.todo, () => {
  if(props.todo) action.value = 'update'
})

const labels = {
  header: {
    create: 'Новая задача',
    update: 'Изменить задачу'
  },
  button: {
    create: 'Добавить',
    update: 'Сохранить'
  }
}

const saveTodo = () => {
  if (!form.value) return
  if (!props.todo) {
    todosStore.add(form.value.formData)
  } else {
    todosStore.update(props.todo!.uuid, form.value.formData)
  }
  modal.value?.close()
}

defineExpose({
  open: () => {
    modal.value!.open()
  }
})
</script>

<template>
  <Modal ref="modal">
    <h2>{{ labels.header[action] }}</h2>
    <TodoModalForm ref="form" :todo="todo" />
    <button class="button" @click="saveTodo">{{ labels.button[action] }}</button>
  </Modal>
</template>

<style lang="scss" scoped></style>
