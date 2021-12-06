<template>
  <div class="view home">
     <div class="home list-section">
       <div class="search-box"></div>
       <div class="list container">
         <x-little-product></x-little-product>
       </div>
     </div>
  </div>
</template>

<script>
import XLittleProduct from "@/components/unique/Home/x-little-product.vue"

export default {
  name: 'Home',
  components: {
    XLittleProduct  
  }
}
</script>

<style scoped lang="postcss">
@import "../styles/views/Home.pcss";
</style>