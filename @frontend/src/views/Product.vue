<template>
  <v-sheet class="view product">
    <!-- <router-link class="text-xl" to="/">Back to Home</router-link> -->
    <div class="product image">
      <img class="w-full h-auto" src="https://via.placeholder.com/1000">
    </div>
    <div class="product title-text">
      我是測試是我是測試是我是測試是我是測試是我是測試是我是測試是我是測試是我是測試是我
    </div>
    <div class="product section-price-sold">
      <div class="product price">
        $ 9999
      </div>
      <div class="product sold">
        已售出 999 件
      </div>
    </div>
    <hr class="border-t border-custom-black-trn-2 my-2 self-stretch">
    <div class="product type">
      <div class="type-title">種類</div>
      <div class="type-selectors">
        <div class="selectors-item active">test</div>
        <div class="selectors-item">test</div>
        <div class="selectors-item">test</div>
        <div class="selectors-item">test</div>
        <div class="selectors-item">test</div>
        <div class="selectors-item">test</div>
        <div class="selectors-item">test</div>
      </div>
    </div>
    <hr class="border-t border-custom-black-trn-2 my-4 self-stretch">
    <div class="product description">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </div>

  </v-sheet>  
</template>

<script>
export default {
  data: () => ({
    info: {
      types: [
        
      ]
    }
  })
}
</script>

<style lang="postcss">
@import "../styles/views/Product.pcss";
</style>