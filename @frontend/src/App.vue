<template>
  <x-app bg:color="#C9BA98">
    <x-container>
      <x-header></x-header>
      <x-content>
        <router-view></router-view>
      </x-content>
      <x-footer></x-footer>
    </x-container>
  </x-app>
</template>

<script>
import XApp from "@/components/unique/_root/x-app.vue"

export default {
  components: {
    XApp
  },
  data: () => ({

  })
}
</script>

<style>
</style>
