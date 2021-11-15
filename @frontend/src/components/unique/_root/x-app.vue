<template>
  <div class="min-h-screen flex justify-center" :style="`${ styles('bgColor') }`">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "x-app",
  data: () => ({

  }),
  props: {
    "bg:color": {
      type: String,
      required: true
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

<style>

</style>