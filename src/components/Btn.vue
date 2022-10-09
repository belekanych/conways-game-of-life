<script setup lang="ts">
// Props
const props = defineProps<{
  icon?: string,
}>()


// Emits
const emit = defineEmits(['click'])
</script>

<template>
  <button
    type="button"
    class="pointer-events-auto rounded-lg shadow-lg bg-white hover:bg-slate-50 py-2 px-4 text-center font-medium active:scale-90 active:shadow-md dark:bg-slate-800 dark:text-white hover:dark:bg-slate-700 transition w-12 mb-2"
    @click.prevent="emit('click')"
  >
    <slot>
      <font-awesome-icon :icon="['fa-solid', `fa-${props.icon}`]" />
    </slot>
  </button>
</template>
