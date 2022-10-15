<script setup lang="ts">
import { ref, watch } from 'vue'
import { SPEED_DEFAULT } from '../config/speed'
import { useMapStore } from '../store/map'
import Btn from './Btn.vue'
import SpeedControl from './SpeedControl.vue'

// Store
const mapStore = useMapStore()

// Data
const playing = ref<boolean>(false)
const speed = ref<number>(SPEED_DEFAULT)

let tick: number

// Watchers
watch(speed, () => {
  if (playing.value) {
    clearInterval(tick)
  }

  handleTick()
})

// Methods
function createTick() {
   return setInterval(() => {
    if (playing.value) {
      mapStore.nextStep()
    }
  }, 1000 / speed.value)
}

function handleTick() {
  if (playing.value) {
    tick = createTick()
  } else {
    clearInterval(tick)
  }
}

function play() {
  playing.value = !playing.value

  handleTick()
}
</script>

<template>
  <div class="flex">
    <speed-control v-model="speed" />
    <btn
      :icon="playing ? 'pause' : 'play'"
      class="mx-2"
      @click="play"
    />
    <btn
      icon="angle-right"
      @click="mapStore.nextStep"
    />
  </div>
</template>