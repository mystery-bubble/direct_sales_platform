<template>
  <div class="x-app" :style="`background-color: ${ bgColor }`">
    <x-container :bg-color="innerColor">
      <x-header />
      <div class="x-main">
        <slot></slot>
      </div>
      <x-footer />
    </x-container>
  </div>
</template>

<script>
import XHeader from "@/components/unique/_root/x-header.vue"
import XContainer from "@/components/unique/_root/x-container.vue"

export default {
  name: "x-app",
  components: {
    XContainer,
    XHeader
  },
  data: () => ({

  }),
  props: {
    "bg-color": {
      type: String,
      required: true
    },
    "inner-color": {
      type: String,
      default: "transparent"
    }
  }
}
</script>

<style scoped lang="postcss">
@import "../../../styles/components/unique/_root/x-app.pcss";
</style>