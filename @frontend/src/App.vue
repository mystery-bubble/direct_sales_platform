<template>
  <x-app bg:color="#C9BA98">
    <x-container bg:color="#E7D7B4" horizontal-align="center">
      <x-header></x-header>
      <x-content>
        <router-view></router-view>
      </x-content>
      <template v-slot:footer>
        <x-footer></x-footer>
      </template>
    </x-container>
  </x-app>
</template>

<script>
import XApp from "@/components/unique/_root/x-app.vue"
import XContainer from "@/components/unique/_root/x-container.vue"
import XHeader from "@/components/unique/_root/x-header.vue"

export default {
  components: {
    XApp,
    XContainer,
    XHeader
  },
  data: () => ({

  })
}
</script>

<style>
</style>
