<script setup lang="ts">
const emit = defineEmits([
  'random',
  'clear',
  'update:modelValue'
])

const props = defineProps<{
  modelValue: boolean,
}>()

function pencil() {
  emit('update:modelValue', true)
}

function erase() {
  emit('update:modelValue', false)
}

function random() {
  emit('random')
}

function clear() {
  emit('clear')
}
</script>

<template>
  <div class="flex flex-col">
    <button
      type="button"
      class="pointer-events-auto rounded-lg shadow-lg bg-white py-2 px-4 text-center font-medium active:scale-90 active:shadow-md transition w-12 mb-2"
      :class="{'shadow-xl scale-105 text-blue-700': props.modelValue}"
      @click.prevent="pencil"
    >
      <font-awesome-icon icon="fa-solid fa-pencil" />
    </button>
    <button
      type="button"
      class="pointer-events-auto rounded-lg shadow-lg bg-white py-2 px-4 text-center font-medium active:scale-90 active:shadow-md transition w-12 mb-2"
      :class="{'shadow-xl scale-105 text-blue-700': !props.modelValue}"
      @click.prevent="erase"
    >
      <font-awesome-icon icon="fa-solid fa-eraser" />
    </button>
    <button
      type="button"
      class="pointer-events-auto rounded-lg shadow-lg bg-white py-2 px-4 text-center font-medium active:scale-90 active:shadow-md transition w-12 mb-2"
      @click.prevent="random"
    >
      <font-awesome-icon icon="fa-solid fa-shuffle" />
    </button>
    <button
      type="button"
      class="pointer-events-auto rounded-lg shadow-lg bg-white py-2 px-4 text-center font-medium active:scale-90 active:shadow-md transition w-12"
      @click.prevent="clear"
    >
      <font-awesome-icon icon="fa-solid fa-trash" />
    </button>
  </div>
</template>
