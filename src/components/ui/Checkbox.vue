<script setup lang="ts">
import { ref } from 'vue';

const isChecked = ref<boolean>(false)

const emit = defineEmits(["update:modelValue"])

const check = () => {
    isChecked.value = !isChecked.value
    emit('update:modelValue', isChecked)
}
</script>

<template>
    <IconCheckbox @click="check"/>
</template>

<style lang="scss" scoped>

</style>