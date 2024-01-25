<template>
  <Transition name="modal-fade" :duration="400">
    <slot />
  </Transition>
</template>

<style lang="scss">
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}

.modal-fade-leave-active {
  transition-delay: 0.2s;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active .modal,
.modal-fade-leave-active .modal {
  transition: all 0.2s ease-in-out;
}

.modal-fade-enter-active .modal {
  transition-delay: 0.2s;
}

.modal-fade-enter-from .modal,
.modal-fade-leave-to .modal {
  transform: translateY(-30px);
  opacity: 0;
}
</style>
