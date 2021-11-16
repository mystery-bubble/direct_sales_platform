<template>
  <div
    :class="`container items-${ this['horizontalAlign'] }${ this.fluid ? ' fluid' : '' }`"
    :style="`${ styles('bgColor') }`"
  >
    <slot name="header"></slot>
    <slot></slot>
    <slot name="footer"></slot>
  </div>
</template>

<script>
export default {
  name: "x-container",
  props: {
    fluid: {
      type: Boolean,
      default: false
    },
    "bg:color": {
      type: String,
      default: "transparent"
    },
    "horizontalAlign": {
      type: String,
      default: "start"
    }
  },
  methods: {
    styles( cssname ) {
      switch ( cssname ) {
        case "bgColor":
        case "backgroundColor":
        case "background-color":
          return `background-color: ${ this['bg:color'] };`
        default:
          return ""
      }  
    }
  }
}
</script>

<style scoped lang="postcss">
.container {
  @apply w-10/12 min-h-screen flex flex-col
}
.fluid {
  @apply w-full
}
</style>