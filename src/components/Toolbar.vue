<script setup lang="ts">
import Btn from './Btn.vue'

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
    <btn
      :class="['mb-2', props.modelValue && 'shadow-xl scale-110 text-blue-700 dark:text-blue-300']"
      icon="pencil"
      @click="pencil"
    />
    <btn
      :class="['mb-2', !props.modelValue && 'shadow-xl scale-110 text-blue-700 dark:text-blue-300']"
      icon="eraser"
      @click="erase"
    />
    <btn
      icon="shuffle"
      @click="random"
    />
    <btn
      icon="trash"
      @click="clear"
    />
  </div>
</template>
