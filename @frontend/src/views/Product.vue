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
    <hr class="border-t border-custom-black-trn-2 my-5 self-stretch">
    <div class="product description">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </div>

  </v-sheet>  
</template>

<script>
export default {
}
</script>

<style lang="postcss">
.view.product {
  @apply flex flex-col bg-custom-light-trn-1 p-3;

  border-radius: 12px;
}

.product.image {
    @apply border-2 border-custom-dark-trn-1 w-full flex justify-center items-center overflow-hidden;

    border-radius: 8px;
    height: auto;
}

.product.title-text {
  @apply max-w-full text-justify font-bold break-all mt-2;

  font-size: 1.2rem
}

.product.price {
  @apply text-3xl font-bold text-custom-black my-2;
}

.product.type > .type-title {
  @apply font-bold text-lg
}

.product.section-price-sold {
  @apply flex justify-between items-center mx-1
}

.product.section-price-sold > .product.sold {
  @apply px-2 py-1 bg-custom-darker-trn-1 text-custom-white;

  border-radius: 6px
}

.type-selectors {
  @apply flex flex-wrap
}

.type-selectors > .selectors-item {
  @apply mr-2 mt-1 px-3 py-1 border border-custom-darker;

  border-radius: 6px;
}

.selectors-item.active {
  @apply bg-custom-black border-0 border-custom-black
}

.product.description {
}
</style>