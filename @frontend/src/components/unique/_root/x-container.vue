<template>
  <div class="x-container" :style="`background-color: ${ bgColor }`">
    <slot></slot>
  </div>
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
@import "../../../styles/components/unique/_root/x-container.pcss";
</style>