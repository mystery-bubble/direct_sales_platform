<template>
  <v-sheet class="x-container" :color="bgColor">
    <slot></slot>
  </v-sheet>
</template>

<script>
export default {
  name: "x-container",
  props: {
    "bg-color": {
      type: String,
      default: "transparent"
    }
  }
}
</script>

<style scoped lang="postcss">
.x-container {
  @apply w-10/12 min-h-screen flex flex-col
}
.fluid {
  @apply w-full
}
</style>