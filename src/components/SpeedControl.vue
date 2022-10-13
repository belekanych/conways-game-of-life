<script setup lang="ts">
import { ref } from 'vue'
import Btn from './Btn.vue'

const SPEED_SLOW = 1
const SPEED_NORMAL = 4
const SPEED_FAST = 10

const emit = defineEmits(['update:modelValue'])

const props = defineProps<{
  modelValue: number
}>()

const expanded = ref<boolean>(false)

const options = {
  'Slow': SPEED_SLOW,
  'Normal': SPEED_NORMAL,
  'Fast': SPEED_FAST,
}

function toggle(): void {
  expanded.value = !expanded.value
}

function onSelect(speed: number): void {
  emit('update:modelValue', speed)
}
</script>

<template>
  <div class="relative">
    <btn
      icon="gauge-high"
      @click="toggle"
    />
    <ul
      v-show="expanded"
      class="absolute mt-1 right-0 rounded-lg shadow-lg bg-white overflow-hidden dark:bg-slate-800 dark:text-white"
    >
      <li
        v-for="(speed, name, index) in options"
        :key="speed"
      >
        <button
          type="button"
          class="w-full text-right py-1 px-2 w-24 text-sm hover:bg-slate-50 hover:dark:bg-slate-700 border-slate-200 dark:border-slate-600"
          :class="{'border-t': index, 'font-bold': speed === props.modelValue}"
          @click.prevent="onSelect(speed)"
        >
          <font-awesome-icon v-if="speed === props.modelValue" icon="fa-solid fa-angle-right" class="mr-2" />{{ name }}
        </button>
      </li>
    </ul>
  </div>
</template>