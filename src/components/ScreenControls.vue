<script setup lang="ts">
import { ref, watch } from 'vue'
import { useMapStore } from '../store/map'
import SpeedControl from './SpeedControl.vue'
import Btn from './Btn.vue'

const DEFAULT_SPEED = 4

const mapStore = useMapStore()

const playing = ref<boolean>(false)
const speed = ref<number>(DEFAULT_SPEED)

let tick: number

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

watch(speed, () => {
  if (playing.value) {
    clearInterval(tick)
  }

  handleTick()
})
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