<template>
  <v-app>
    <v-sheet class="x-app" :color="bgColor">
      <x-container :bg-color="innerColor">
        <x-header />
        <v-main>
          <slot></slot>
        </v-main>
        <x-footer />
      </x-container>
    </v-sheet>
  </v-app>
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

<style lang="postcss">
.x-app {
  @apply flex justify-center
}
</style>