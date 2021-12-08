<template>
  <x-app bg-color="#C9BA98" inner-color="#E7D7B4">
    <router-view class="mx-7"></router-view>
  </x-app>
</template>

<script>
import XApp from "@/components/unique/_root/x-app.vue"

export default {
  name: 'App',
  components: {
    XApp
  }
};
</script>
