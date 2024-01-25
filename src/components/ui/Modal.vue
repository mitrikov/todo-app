<script setup lang="ts">
import { ref, watch } from 'vue';
import { lockScroll, unlockScroll } from '@/utils';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

const modal = ref<HTMLElement | null>(null);
const isVisible = ref<boolean>(false);
let mouseDownElement: HTMLElement | null = null;

let onOpenCallback: Function | null = null;
let onCloseCallback: Function | null = null;

const open = () => {
  isVisible.value = true;
  lockScroll();
  if (onOpenCallback) onOpenCallback();
};

const close = () => {
  isVisible.value = false;
  unlockScroll();
  if (onCloseCallback) onCloseCallback();
};

const toggle = () => {
  isVisible.value ? close() : open();
};

const onClose = (callback: Function) => {
  if (callback instanceof Function) {
    onCloseCallback = callback;
  }
};

const onOpen = (callback: Function) => {
  if (callback instanceof Function) {
    onOpenCallback = callback;
  }
};

const onMouseUpOverlay = (e: MouseEvent) => {
  if (e.target === e.currentTarget && mouseDownElement === e.target) close();
};

const onMouseDownModal = (e: MouseEvent) => {
  e.stopPropagation()
  mouseDownElement = e.target as HTMLElement;
};

watch(
  () => props.visible,
  (nVal, oVal) => {
    isVisible.value = nVal;
  }
);

defineExpose({
  onClose,
  onOpen,
  open,
  close,
  toggle,
});
</script>

<template>
  <div
    class="modal-overlay"
    ref="modal"
    v-if="isVisible"
    @mouseup="onMouseUpOverlay"
    @mousedown="onMouseDownModal"
  >
    <div class="modal" :class="class">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
.modal-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--color-overlay-black);
  backdrop-filter: blur(2px);
}
.modal {
  background-color: var(--color-background);
  border-radius: var(--border-radius-lg);
  padding: 2rem;

  &.no-gaps {
    padding: 0;
  }
}
</style>
