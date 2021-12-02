<template>
  <v-sheet class="view product">
    <!-- <router-link class="text-xl" to="/">Back to Home</router-link> -->
    <div class="product image">
      <img class="w-full h-auto" src="https://via.placeholder.com/1000">
    </div>
    <div class="product-title">
      我是測試是我是測試是我是測試是我是測試是我是測試是我是測試是我是測試是我是測試是我
    </div>
  </v-sheet>  
</template>

<script>
export default {
}
</script>

<style lang="postcss">
.view.product {
  @apply flex flex-col items-center bg-custom-light-trn-1 p-3;

  border-radius: 12px;
}

.product.image {
    @apply border-2 border-custom-dark-trn-1 w-full flex justify-center items-center overflow-hidden;

    border-radius: 8px;
    height: auto;
}

.product-title {
  @apply max-w-full text-xl font-bold break-all;
}
</style>