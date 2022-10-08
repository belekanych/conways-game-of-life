<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['update:modelValue'])

const props = defineProps<{
  modelValue: number
}>()

const expanded = ref<boolean>(false)

const options = {
  'Slow': 1,
  'Normal': 4,
  'Fast': 10,
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
    <button
      type="button"
      class="pointer-events-auto rounded-lg shadow-lg bg-white py-2 px-4 text-center font-medium active:scale-90 active:shadow-md transition w-12"
      @click.prevent="toggle"
    >
      <font-awesome-icon icon="fa-gauge-high" />
    </button>
    <ul
      v-show="expanded"
      class="absolute mt-1 right-0 rounded-lg shadow-lg bg-white overflow-hidden"
    >
      <li
        v-for="(speed, name, index) in options"
        :key="speed"
      >
        <button
          type="button"
          class="w-full text-right py-1 px-2 w-24 text-sm hover:bg-gray-50"
          :class="{'border-t': index, 'font-bold': speed === props.modelValue}"
          @click.prevent="onSelect(speed)"
        >
          <font-awesome-icon v-if="speed === props.modelValue" icon="fa-solid fa-angle-right" class="mr-2" />{{ name }}
        </button>
      </li>
    </ul>
  </div>
</template>